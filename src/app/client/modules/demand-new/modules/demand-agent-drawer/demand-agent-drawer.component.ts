import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  BehaviorSubject, catchError,
  debounceTime,
  distinctUntilChanged,
  filter, finalize,
  map, Observable, of, pairwise,
  startWith,
  switchMap,
  tap, throwError
} from 'rxjs';
import { FileDnd } from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';
import { DocumentReq } from '../../../requests/interfaces/request.interface';
import { downloadBase64File, extractBase64 } from 'src/app/shared/services/tools.service';
import { FormGenerator } from '../../tools/form-generator';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAgentRequestService } from '../../../../../public/service/get-agent-request.service';
import { AgentSuggestionsInterface, BankInfo } from '../../../../../public/type/agent.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DemandService } from '../../services/demand.service';
import { DrawerData } from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import { DemandInterface } from '../../types/demand.interface';
import { formatDate } from '@angular/common';
import { DemandsPrepareEnum } from '../../pages/demand-new-home/demand-new-home.component';
import { SuretyPrepareData } from '../demand-surety-drawer/demand-surety-drawer.component';
import { MIBCommon } from '../../../../../shared/classes/common/mid-common.class';
import { DemandSelectboxInterface } from '../../types/demand-selectbox.interface';
import { FileMode } from '../../../../../shared/types/file/file-model.interface';
import {
  RequestFailureModalService
} from '../../../../../shared/modules/modals/request-failure-modal/request-failure-modal.service';
import {
  RequestCreateSuccessModalService
} from '../../../../../shared/modules/modals/request-create-success-modal/request-create-success-modal.service';
import { DemandDrawerService } from '../demand-drawer/demand-drawer.service';
import { Properties } from 'csstype';

type DocumentsType  =
  'charter'
  | 'ceoPassport'
  | 'foundingDecision'
  | 'appointmentOrder'
  | 'balanceSheet'
  | 'turnoverBalanceSheet'
  | 'foundersPassports'

@UntilDestroy()
@Component({
	selector: 'mib-demand-agent-drawer',
	templateUrl: './demand-agent-drawer.component.html',
	styleUrls: ['./demand-agent-drawer.component.scss']
})
export class DemandAgentDrawerComponent implements OnInit {

  private mibCommon = new MIBCommon()
  private fb = inject(FormBuilder);
  private getAgentRequestService = inject(GetAgentRequestService);
  private _formGenerator = new FormGenerator(this.fb);
  private demandService = inject(DemandService);
  private requestFailureModalService = inject(RequestFailureModalService);
  private requestCreateSuccessModalService = inject(RequestCreateSuccessModalService)
  private titleInfo = { create: null, update: null, status: null };

  isSubmitting$ = new BehaviorSubject<boolean>(false);
  progress$ = new BehaviorSubject<number>(1);
  progress: number = 1;
  maxPage: number = 5;
  pageCount: number = 1;
  form: FormGroup;
  dataByINN = [];
  orgData: AgentSuggestionsInterface;
  typesOfOwner: DemandSelectboxInterface[] = []
  realtyAddressOptions: { [key: number]: BankInfo[] } = {};
  dataByDebitorINN: { [key: number]: AgentSuggestionsInterface[] } = {};
  dataByCreditorINN: { [key: number]: AgentSuggestionsInterface[] } = {};
  bankAdditionalDataByName: { [key: number]: BankInfo[] } = {};
  bankDataByName = [];
  bankData: BankInfo;
  tabIndex = '1';
  demandDrawerService = inject(DemandDrawerService);
  data: DrawerData = inject(MAT_DIALOG_DATA);
  dialogRef: MatDialogRef<DemandAgentDrawerComponent> = inject(MatDialogRef);
  messageForm: FormGroup;
  loading$ = new BehaviorSubject<boolean>(false);
  preparedData?: SuretyPrepareData
  viewingData: DemandInterface<{ Subject: string; Question: string; Files: [] }>;
  groupDocuments = this.fb.group({
    charter: this.fb.array([]),
    ceoPassport: this.fb.array([]),
    foundingDecision: this.fb.array([]),
    appointmentOrder: this.fb.array([]),
    balanceSheet: this.fb.array([]),
    turnoverBalanceSheet: this.fb.array([]),
    foundersPassports: this.fb.array([])
  });

  skeleton: Properties = {
    borderRadius: '8px',
    height: '95px',
    width: '100%'
  };

  identify(index, item) {
    return item.DemandMessageID;
  }

  get date(): { create: Date, update: Date, status: string } {
    return this.titleInfo;
  }

  get requestId(): number {
    return this.data.data.id;
  }

  set requestId(val: number) {
    this.data.data.id = val;
  }

  get otherBanks(): FormArray {
    return this.form.get('otherBanks') as FormArray;
  }

  get factoringPlaces(): FormArray {
    return this.form.get('factoringPlaces') as FormArray;
  }

  get factoringCredits(): FormArray {
    return this.form.get('factoringCredits') as FormArray;
  }

  get factoringEDIProviders(): FormArray {
    return this.form.get('factoringEDIProviders') as FormArray;
  }

  ngOnInit() {

    this.typesOfOwner = this.mibCommon.getTypesOfOwner();

    const modalData = this.data.data;

    this.form = this._formGenerator.generateAgentFactoringForm();

    if (this.isView) {
      this.form.disable();
    }

    // Если редактирование ИЛИ просмотр, тогда тянем данные с АПИ
    if (modalData?.isEdit || modalData?.isView) {
      this.getByID(modalData.id, modalData.isEdit);
      this.initMessageForm();
    }

    // Если создание и нет черновика
    if (modalData?.isCreation && !modalData?.id) {
      // инициализируем черновик
      this.initDraft();
      // Запрашиваем метод prepare для предзаполнения инпутов
      this.prepareDemandByTypes(modalData.prepareTypeId).subscribe();

    }

    // Если создание и есть черновик
    if (modalData?.isCreation || modalData?.isEdit) {
      this.getDataByINN().pipe(tap(data => this.mapOrganizationDataToForm(data?.data))).subscribe();
      this.getBankData().pipe(tap(data => this.mapBankDataToForm(data?.data))).subscribe();
      // Включаем авто сохранение первого/второго таба
      this.enableAutoSaveDraft(this.form);

    }
  }

  private prepareDemandByTypes(type: DemandsPrepareEnum) {
    console.log(type);
    this.loading$.next(true);
    return this.demandService.prepareDemandByTypes(type)
      .pipe(
        tap(res => {
          console.log('prepareDemandByTypes=>', res);
          this.preparedData = res;
          this.mapDataToForm(res);
        }),
        finalize(() => this.loading$.next(false))
      );
  }

  get isView(): boolean {
    return this.data.data.isView;
  }

  get isChangeByView(): boolean {
    return this.isView;
  }

  private getByID(id: number, isDraft: boolean) {
    this.loading$.next(true);
    const req$ = isDraft
      ? this.demandService.getDemandDraftById(id)
      : this.demandService.getDemandById(id);

    req$
      .pipe(
        tap(res => {
          this.loading$.next(false);
          const data = isDraft ? res.DemandData : res.Data;

          if (this.isView) {
            this.viewingData = res;
          }

          if (!isDraft) {
            this.titleInfo = {
              create: res.DateCreated,
              update: res.DateModify,
              status: this.demandService.getStatus(res.Status)
            };
          }
          this.mapDataToForm(data)
        }),
        finalize(() => this.loading$.next(false))
      )
      .subscribe();
  }

  private mapDataToForm(data): void {
    if (!data) {
      console.error('Нет данных для маппинга');
      return;
    }

    const files = data?.Files || [];
    for (let file of files) {
      const docs = this.groupDocuments.get(file.Identifier) as FormArray;
      const control = this.createDocumentControl(file);
      if (this.isView) {
        control.disable();
      }
      docs?.push(control);
    }

    const organization = data.Anket?.Organization || {};
    const factoring = data.AgencyFactoring || {};

    // Заполнение основных полей
    this.form.patchValue({
      organizationType: organization.Type || 0,
      organizationLegalForm: organization.LegalForm || '',
      organizationShortName: organization.ShortTitle || '',
      organizationINN: organization.Requisites?.INN || '',
      organizationPhone: organization.Phone || '',
      organizationEmail: organization.Email || '',
      organizationWEB: organization.Website || '',

      bankBik: factoring.Account?.BIK || '',
      bankCorrespondentAccount: factoring.Account?.COR || '',
      bankName: factoring.Account?.Bank || '',
      bankAccountOpenDate: factoring.Account?.Date
        ? new Date(factoring.Account.Date).toISOString().split('T')[0]
        : '',
      bankOwnerAccount: factoring.Account?.Number || '',
      bankComment: factoring.Account?.Comment || '',

      factoringProducts: factoring.Products || '',
      factoringTradeMarks: factoring.Trademarks || '',
      factoringShipments: factoring.Suppliers || '',
      factoringFinanceLimit: factoring.LimitWanted || null,
      factoringClients: factoring.Buyers || '',
      factoringWorkers: factoring.StaffAmount || 0,
    }, {emitEvent: false});

    // Маппинг OtherBanks с использованием addAccount
    factoring.AddonAccounts?.forEach((bank) => {
      this.addAccount({
        otherBankAccountOpenDate: bank.Date,
        otherBankAccountCloseDate: bank.Expire,
        otherBankName: bank.Bank,
        otherBankOwnerAccount: bank.Number,
        otherBankTarget: bank.Comment,
      });
    });

    // Маппинг FactoringPlaces с использованием addRealty
    factoring.Properties?.forEach((place) => {
      const address = place.Address;
      const displayAddress = this.formatAddress(address);

      this.addRealty({
        displayAddress,
        factoringPlacesAddress: address,
        factoringPlacesLegalForm: place.Type,
      });
    });

    // Маппинг FactoringCredits с использованием addCredit
    factoring.Obligations?.forEach((credit) => {
      this.addCredit({
        factoringCreditsCreditor: credit.Creditor,
        factoringPlacesTypeDuty: credit.Type,
        factoringPlacesDateClose: credit.Date,
        factoringPlacesContractSum: credit.Summ,
        factoringPlacesBalanceReport: credit.ReportingRest,
        factoringPlacesBalanceCurrent: credit.CurrentRest,
      });
    });

    // Маппинг FactoringEDIProviders с использованием addEDI
    factoring.EDI?.forEach((edi) => {
      this.addEDI({
        factoringEDIProvidersDebitor: edi.Company,
        factoringEDIProvidersProvider: edi.EDIProvider,
      });
    });
  }

  private formatAddress(address: any): string {
    if (!address) {
      return '';
    }

    // Функция для проверки наличия префикса (например, 'г', 'д')
    const addPrefixIfAbsent = (value: string, prefix: string): string => {
      return value.startsWith(prefix) ? value : `${prefix} ${value}`;
    };

    // Формируем строку из доступных полей с проверкой
    const parts = [
      address.RegionTitle, // Например, "Ямало-Ненецкий АО"
      address.City ? addPrefixIfAbsent(address.City, 'г') : '', // Например, "г Новый Уренгой"
      address.Street || '', // Например, "пр-кт Мира"
      address.House ? addPrefixIfAbsent(address.House, 'д') : '', // Например, "д 10"
      address.Appartment ? addPrefixIfAbsent(address.Appartment, 'кв') : '', // Например, "кв 12"
    ];

    // Фильтруем пустые значения и соединяем через запятую
    return parts.filter(part => part).join(', ');
  }

  patchData(data: any): void {
    this.form.patchValue(data, { emitEvent: false });
  }

  // todo: каюсь, уже 3 раз скопипастил

  mapShortToCode(short) {
    const opfMapping = {
      'ООО': 1,
      'ЗАО': 2,
      'ПАО': 3,
      'ОАО': 4,
      'НАО': 5,
      'АО': 6
    };

    return opfMapping[short] || null;
  }

  mapOrganizationDataToForm(data: any): void {
    if (data) {

      this.form.patchValue({
        organizationType: this.mapShortToCode(data.opf?.short),
        organizationLegalForm: data.opf?.short || '',
        organizationShortName: data.name?.short || '',
        organizationPhone: data.phones?.[0] || '',
        organizationEmail: data.emails?.[0] || '',
        organizationWEB: ''
      });
    }
  }

  mapBankDataToForm(data: any): void {
    if (data) {
      this.form.patchValue({
        bankBik: data.bic || '',
        bankCorrespondentAccount: data.correspondent_account || '',
        // bankName: data.name?.short || '',
        bankAccountOpenDate: new Date().toISOString().split('T')[0],
        bankOwnerAccount: data.inn || '' // todo: сомневаюсь, что инн
        // bankComment: data.address?.unrestricted_value || ''
      });
    }
  }

  public mapOtherBankDataToForm(data: any, index: number): void {
    // Проверка наличия данных и индекса
    if (!data || index === undefined || index < 0) return;

    // Получаем текущий контрол формы по индексу
    const controls = this.otherBanks?.at(index);

    if (controls) {
      // Мапим данные с бэка в контрол формы
      controls.patchValue({
        otherBankAccountOpenDate: data?.state?.registration_date
          ? formatDate(new Date(data.state.registration_date), 'yyyy-MM-dd', 'en')
          : '',
        otherBankAccountCloseDate: data?.state?.liquidation_date
          ? formatDate(new Date(data.state.liquidation_date), 'yyyy-MM-dd', 'en')
          : '',
        // otherBankName: data?.name?.short || '',
        otherBankOwnerAccount: data?.correspondent_account || '',
        otherBankTarget: data?.address?.value || '',
      });
    }
  }

  nextPage() {
    if (this.pageCount >= 1 && this.pageCount <= this.maxPage - 1) {
      this.progress = this.progress$.value + 1;
      this.progress$.next(this.progress);
      this.pageCount = this.progress;
      console.log('next', this.progress);
    } else {
      return;
    }
  }

  prevPage() {
    if (this.pageCount >= 2 && this.pageCount <= this.maxPage) {
      this.progress = this.progress$.value - 1;
      this.progress$.next(this.progress);
      this.pageCount = this.progress;
      console.log('prev', this.progress);
    } else {
      return;
    }
  }

  getDataByINN() {
    return this.form.get('organizationINN')?.valueChanges.pipe(
      filter(() => this.pageCount === 1),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestService.getAgentData(value)),
      map((options) => {
        this.dataByINN = options.suggestions || [];
        this.orgData = this.dataByINN.find((option) => this.form.get('organizationINN').value === option?.data?.inn);
        return this.orgData;
      }),
      untilDestroyed(this)
    );
  }

  getBankData() {
    return this.form.get('bankName').valueChanges.pipe(
      filter(() => this.pageCount === 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestService.getBankData(value)),
      map(val => {
        this.bankDataByName = val;
        this.bankData = this.bankDataByName.find((el) => this.form.get('bankName').value === el.value);
        return this.bankData;
      }),
      untilDestroyed(this)
    );
  }

  private enableAutoSaveDraft(form: FormGroup | AbstractControl): void {
    form?.valueChanges
      .pipe(
        untilDestroyed(this), // Автоматически уничтожает подписку
        filter(() => !!this.requestId),
        debounceTime(500),
        distinctUntilChanged(),
        startWith(form.value),
        pairwise(),
        filter(([prev, curr]) => this.hasFormChanged(prev, curr)),
        switchMap(() => this.saveDraft())
      )
      .subscribe({
        next: result => this.onSaveDraftSuccess(result),
        error: error => this.onSaveDraftError(error)
      });
  }

  private hasFormChanged(prev: any, curr: any): boolean {
    return JSON.stringify(prev) !== JSON.stringify(curr);
  }

  private onSaveDraftSuccess(result: any): void {
    console.log('Черновик и файлы успешно сохранены:', result);
  }

  private onSaveDraftError(error: any): void {
    console.error('Ошибка при сохранении черновика или файлов:', error);
  }

  public createDraftPayload() {
    const form = this.form.getRawValue();

    const listProperties = form.factoringPlaces?.map((place: any) => ({
      Address: {
        Appartment: place.factoringPlacesAddress?.Appartment || null,
        City: place.factoringPlacesAddress?.City || null,
        Country: place.factoringPlacesAddress?.Country || null,
        District: place.factoringPlacesAddress?.District || null,
        House: place.factoringPlacesAddress?.House || null,
        Locality: place.factoringPlacesAddress?.Locality || null,
        PostCode: place.factoringPlacesAddress?.PostCode || null,
        RegionCode: place.factoringPlacesAddress?.RegionCode
          ? Number(place.factoringPlacesAddress.RegionCode)
          : null,
        RegionTitle: place.factoringPlacesAddress?.RegionTitle || null,
        Street: place.factoringPlacesAddress?.Street || null
      },
      Comment: null,
      Type: place.factoringPlacesLegalForm || null
    })) || [];

    const listObligations = form.factoringCredits?.map((credit: any) => ({
      Creditor: credit.factoringCreditsCreditor || null,
      CurrentRest: credit.factoringPlacesBalanceCurrent || 0,
      Date: credit.factoringPlacesDateClose ? new Date(credit.factoringPlacesDateClose) : null,
      ReportingRest: credit.factoringPlacesBalanceReport || 0,
      Summ: credit.factoringPlacesContractSum || 0,
      Type: credit.factoringPlacesTypeDuty || null
    })) || [];

    const listAddonAccounts = form.otherBanks?.map((bank: any) => ({
      BIK: null,
      Bank: bank.otherBankName || null,
      COR: null,
      Comment: bank.otherBankTarget || null,
      Date: bank.otherBankAccountOpenDate ? new Date(bank.otherBankAccountOpenDate) : null,
      Expire: bank.otherBankAccountCloseDate ? new Date(bank.otherBankAccountCloseDate) : null,
      Number: bank.otherBankOwnerAccount || null
    })) || [];

    const listEDI = form.factoringEDIProviders?.map((edi: any) => ({
      Company: edi.factoringEDIProvidersDebitor || null,
      EDIProvider: edi.factoringEDIProvidersProvider || null
    })) || [];

    return {
      Anket: {
        Registration: {
          Authority: null,
          Date: new Date(),
          InitDate: new Date(),
          Number: null,
          Place: null
        },
        Resident: {
          Country: 'РФ',
          ForeignCode: null,
          IsResident: true
        },
        Shareholders: [],
        Signer: {
          FactAddress: {
            Appartment: null,
            City: null,
            Country: null,
            District: null,
            House: null,
            Locality: null,
            PostCode: null,
            RegionCode: 0,
            RegionTitle: null,
            Street: null
          },
          Passport: {
            Date: new Date(),
            Expire: new Date(),
            IsForeign: false,
            IssuerCode: null,
            IssuerTitle: null,
            Nationality: null,
            Number: null
          },
          Person: {
            BirthDate: new Date(),
            BirthPlace: null,
            Email: null,
            Gender: 1,
            Name: {
              First: null,
              Last: null,
              Second: null
            },
            NameFirst: null,
            NameLast: null,
            NameSecond: null,
            Phone: null,
            SNILS: null
          },
          PositionDate: new Date(),
          PositionTitle: null,
          RegistrationAddress: {
            Appartment: null,
            City: null,
            Country: null,
            District: null,
            House: null,
            Locality: null,
            PostCode: null,
            RegionCode: 0,
            RegionTitle: null,
            Street: null
          }
        },
        Activities: [],
        Capital: {
          Total: 0,
          Payed: 0,
        },
        Licenses: [],
        Objectives: {
          BankRelationObjective: 16,
          BankRelationObjectiveOther: null,
          FinancialObjective: 1,
          FinancialObjectiveOther: null,
          TransactionsContracts: 'Договор факторинга',
          TransactionsCount: null,
          TransactionsSumm: null,
        },
        Organization: {
          Type: form.organizationType || 0,
          LegalForm: form.organizationLegalForm || null,
          ShortTitle: form.organizationShortName || null,
          Requisites: {
            INN: form.organizationINN || null,
            KPP: null,
            OGRN: null,
            OKATO: null,
            OKPO: null,
          },
          Phone: form.organizationPhone || null,
          Email: form.organizationEmail || null,
          Website: form.organizationWEB || null,
          FactAddress: {
            Appartment: null,
            City: null,
            Country: null,
            District: null,
            House: null,
            Locality: null,
            PostCode: null,
            RegionCode: 0,
            RegionTitle: null,
            Street: null,
          },
          FactAddressEquals: false,
          LegalAddress: {
            Appartment: null,
            City: null,
            Country: null,
            District: null,
            House: null,
            Locality: null,
            PostCode: null,
            RegionCode: 0,
            RegionTitle: null,
            Street: null,
          },
          PostAddress: {
            Appartment: null,
            City: null,
            Country: null,
            District: null,
            House: null,
            Locality: null,
            PostCode: null,
            RegionCode: null,
            RegionTitle: null,
            Street: null,
          },
          PostAddressEquals: false,
          FullTitle: null,
          ForeignTitle: null,
        },
      },
      AgencyFactoring: {
        Account: {
          BIK: form.bankBik || null,
          Bank: form.bankName || null,
          COR: form.bankCorrespondentAccount || null,
          Comment: form.bankComment || null,
          Date: form.bankAccountOpenDate ? new Date(form.bankAccountOpenDate) : null,
          Expire: null,
          Number: form.bankOwnerAccount || null,
        },
        AddonAccounts: listAddonAccounts,
        Buyers: form.factoringClients || null,
        EDI: listEDI,
        FactoringAim: 0,
        LimitWanted: form.factoringFinanceLimit || 0,
        Obligations: listObligations,
        Products: form.factoringProducts || null,
        Properties: listProperties,
        StaffAmount: form.factoringWorkers || 0,
        Suppliers: form.factoringShipments || null,
        Trademarks: form.factoringTradeMarks || null,
      },
      Files: [],
      Type: 'AgencyFactoring',
    };
  }

  private saveDraft(): Observable<any> {
    const payload = this.createDraftPayload();

    return this.demandService.updateDraft(this.requestId, payload).pipe(
      switchMap((draftResult) => {
        if (!draftResult) {
          return throwError(() => new Error('Ошибка сохранения черновика'));
        }
        return of(draftResult);
      })
    );
  }

  private initDraft(): void {
    const payload = this.createDraftPayload();
    this.demandService.createNewDraft(payload)
      .pipe(
        tap(id => {
          this.requestId = id;
        })
      )
      .subscribe();
  }

  private initMessageForm() {
    this.messageForm = this.fb.group({
      FileCode: [''],
      Comment: ['', Validators.required]
    });
  }

  deleteAccount(idx: number) {
    let control = this.otherBanks;
    control.removeAt(idx);
    delete this.bankAdditionalDataByName[idx];
  }

  addAccount(bankData?: any): void {
    let controls = this.otherBanks;

    if (!controls) {
      console.error('FormArray "otherBanks" не найден.');
      return;
    }

    // Генерация формы с возможным патчингом данных
    const control = this._formGenerator.generateBankForm(bankData);
    controls.push(control);

    if (this.isView) {
      control.disable();
    }

    // Подписка на изменения значения имени банка
    const index = controls.length - 1; // Индекс нового элемента
    control.get('otherBankName').valueChanges.pipe(
      filter(() => this.pageCount === 2), // Выполняется только на второй странице
      debounceTime(300), // Дебаунс для уменьшения количества запросов
      distinctUntilChanged(), // Исключение дублирующихся значений
      switchMap(value => this.getAgentRequestService.getBankData(value)), // Запрос данных по имени банка
      tap(val => {
        // Обновление данных по индексу
        this.bankAdditionalDataByName[index] = val;

        // Поиск данных для текущего значения
        const data = val.find(option => control.get('otherBankName').value === option?.value);

        // Патчинг формы с найденными данными
        if (data) {
          this.mapOtherBankDataToForm(data.data, index);
        }
      }),
      untilDestroyed(this) // Уничтожение подписки при уничтожении компонента
    ).subscribe();
  }

  addRealty(factoringPlaceData?: any): void {

    console.log(factoringPlaceData);

    let factoringPlaces = this.form.get('factoringPlaces') as FormArray;

    if (!factoringPlaces) {
      console.error('FormArray "factoringPlaces" не найден.');
      return;
    }

    // Генерация новой формы, с возможным патчингом данных
    const control = this._formGenerator.generateFactoringPlaceForm(factoringPlaceData);
    factoringPlaces.push(control);

    const index = factoringPlaces.length - 1; // Индекс добавленной формы
    const autocompleteControl = control.get('autocompleteInputAddress');

    if (autocompleteControl) {
      autocompleteControl.valueChanges.pipe(
        debounceTime(400), // Задержка для минимизации запросов
        distinctUntilChanged(), // Исключение одинаковых значений
        switchMap((value) =>
          this.getAgentRequestService.getAddressData(value).pipe(
            tap((data) => {
              // Обновляем данные для текущего индекса
              this.realtyAddressOptions[index] = data;
              console.log(`Address options for index ${index}:`, data);
            })
          )
        ),
        untilDestroyed(this) // Автоматическое завершение подписки при уничтожении компонента
      ).subscribe();
    }

    // получаем опции на дефолтное выбранное значение
    autocompleteControl.updateValueAndValidity()
  }

  onRealtyAddress(event: any, idx: number) {
    const factoringPlaces = this.form.get('factoringPlaces') as FormArray;

    if (!factoringPlaces || !factoringPlaces.at(idx)) {
      console.error(`Контрол для индекса ${idx} не найден.`);
      return;
    }

    const suggestion = event?.data; // Данные suggestion из события

    if (!suggestion) {
      console.error('Некорректный объект suggestion:', event);
      return;
    }

    const addressPatch = {
      PostCode: suggestion.postal_code || '',
      Country: suggestion.country || 'Российская Федерация',
      RegionCode: suggestion.region_kladr_id || '',
      RegionTitle: suggestion.region_with_type || '',
      City: suggestion.city_with_type || '',
      District: suggestion.area_with_type || '',
      Locality: suggestion.settlement_with_type || '',
      Street: suggestion.street_with_type || '',
      House: suggestion.house || '',
      Appartment: suggestion.flat || '',
    };

    factoringPlaces.at(idx).patchValue({ factoringPlacesAddress: addressPatch });

    console.log(factoringPlaces.at(idx).getRawValue());

  }

  removeRealty(i: number) {
    this.factoringPlaces.removeAt(i)
    delete this.realtyAddressOptions[i]
  }

  addCredit(data?: any): void {
    const creditGroup = this._formGenerator.generateFactorCreditGroup(data);
    const index = this.factoringCredits.length; // Индекс нового элемента

    creditGroup.get('factoringCreditsCreditor').valueChanges.pipe(
      debounceTime(300), // Задержка для минимизации запросов
      distinctUntilChanged(), // Исключение одинаковых значений
      switchMap(value => this.getAgentRequestService.getAgentData(value)), // Запрос данных по ИНН
      map(data => data.suggestions || []), // Преобразование данных
      tap(data => {
        console.log(data, this.dataByCreditorINN);
        this.dataByCreditorINN[index] = data; // Сохранение данных для отображения
      }),
      catchError(err => {
        console.error(`Ошибка получения данных для кредитора на индексе ${index}:`, err);
        return of([]); // Обработка ошибок
      })
    ).subscribe();

    this.factoringCredits.push(creditGroup);
  }

  removeCredit(index: number): void {
    this.factoringCredits.removeAt(index);
    delete this.dataByCreditorINN[index];
  }

  addEDI(data?: any): void {
    const ediGroup = this._formGenerator.generateEDIFormArray(data);
    const index = this.factoringEDIProviders.length; // Индекс нового элемента

    ediGroup.get('factoringEDIProvidersDebitor').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestService.getAgentData(value)),
      tap(options => {
        this.dataByDebitorINN[index] = options.suggestions || [];
      }),
      untilDestroyed(this)
    ).subscribe()
    this.factoringEDIProviders.push(ediGroup);
  }

  removeEDI(index: number): void {
    this.factoringEDIProviders.removeAt(index);
    delete this.dataByDebitorINN[index];
  }

  downloadCurrentFile(document: AbstractControl): void {
    const { DemandFileID, FileName } = document.getRawValue() as FileMode;

    this.demandService
      .downloadFile(DemandFileID).pipe(
      tap(data => {
        downloadBase64File(data, FileName);
      }),
      catchError(error => {
        console.error(`Ошибка при скачивании файла "${FileName}":`, error);
        return of(null);
      })
    )
      .subscribe();

  }

  deleteDocument(idx: number, type: DocumentsType) {
    const groupByType = this.getGroupDocumentsFormByType(type);
    const { DemandFileID } = groupByType.at(idx).getRawValue() as FileMode;

    this.demandService.deleteDemandFileById(DemandFileID).pipe(
      tap(() => {
        groupByType.removeAt(idx);
      })
    ).subscribe();
  }

  onDocumentLoad({file, url}: FileDnd, type: DocumentsType): void {
    this.uploadDocumentToDraft({
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url),
      File: file
    }, type).pipe(
      tap(doc => {
        this.shiftDocumentControlByType(doc, type);
      })
    ).subscribe();
  }

  shiftDocumentControlByType(data: FileMode, type: DocumentsType) {
    this.getGroupDocumentsFormByType(type).insert(0, this.createDocumentControl(data));
  }

  uploadDocumentToDraft(req: DocumentReq, docType: DocumentsType): Observable<FileMode> {

    return this.demandService.uploadDraftFile(req.File, docType, this.requestId).pipe(
      catchError((err, caught) => {
        console.error(`Ошибка загрузки файла ${req.Title}:`, err);
        return of(err);
      })
    );
  }

  getGroupDocumentsFormByType(type: DocumentsType) {
    return this.groupDocuments.get(type) as FormArray;
  }

  createDocumentControl(data: FileMode) {
    const control = this.fb.group({
      ID: [null],
      Identifier: [null],
      Code: [null],
      FileName: [null],
      Size: [null],
      DemandFileID: [null]
    });
    control.patchValue(data);
    return control;
  }

  private openRequestFailureModal(d): void {
    this.requestFailureModalService.open(d);
  }

  private openRequestSuccessModal(): void {
    this.requestCreateSuccessModalService.open();
  }

  submitData(): void {
    this.isSubmitting$.next(true);
    const resObj = {
      draftId: this.requestId
    };
    this.demandService.createDemand(resObj)
      .subscribe({
        complete: () => {
          this.dialogRef.close();
          this.openRequestSuccessModal();
        },
        error: () => {
          this.dialogRef.close();
          this.openRequestFailureModal(this.requestId);
        }
      });

    // this.dialogRef.close()
  }

  sendMessage() {
    this.isSubmitting$.next(true)
    this.demandService.sendDemandsMessage(this.messageForm.value, this.data.data.id)
      .subscribe({
        complete: () => {
          const modalData = this.data.data
          this.getByID(modalData.id, modalData.isEdit)
          this.resetMessageModal()
          this.isSubmitting$.next(false)
        },
        error: () => {
          this.dialogRef.close()
          this.openRequestFailureModal(this.requestId)
        }
      })
  }

  private resetMessageModal() {
    this.initMessageForm()
    this.demandDrawerService.updateDocumentsState(undefined)
  }

  deleteFile() {
    const modalData = this.data.data;
    this.getByID(modalData.id, modalData.isEdit);
  }
}
