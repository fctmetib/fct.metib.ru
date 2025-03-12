import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DrawerData } from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  forkJoin, map,
  Observable,
  of, pairwise, startWith,
  switchMap,
  takeUntil,
  tap, throwError
} from 'rxjs';
import { ToasterService } from 'src/app/shared/services/common/toaster.service';
import { GetAgentRequestService } from '../../../../../public/service/get-agent-request.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoUnsubscribeService } from '../../../../../shared/services/auto-unsubscribe.service';
import { AgentDataInterface, AgentSuggestionsInterface } from '../../../../../public/type/agent.interface';
import { DemandSignatureDrawerStaticService } from './demand-signature-drawer-static.service';
import { DemandService } from '../../services/demand.service';
import {
  RequestCreateSuccessModalService
} from '../../../../../shared/modules/modals/request-create-success-modal/request-create-success-modal.service';
import {
  RequestFailureModalService
} from '../../../../../shared/modules/modals/request-failure-modal/request-failure-modal.service';
import { DemandInterface } from '../../types/demand.interface';
import { FileReadOptions } from '../demand-drawer/interfaces/demand-drawer.interface';
import { AddressInterface } from '../../../../../shared/types/common/address.interface';
import { DemandsPrepareEnum } from '../../pages/demand-new-home/demand-new-home.component';

@Component({
  selector: 'mib-demand-signature-drawer',
  templateUrl: './demand-signature-drawer.component.html',
  styleUrls: ['./demand-signature-drawer.component.scss']
})
export class DemandSignatureDrawerComponent implements OnInit {
  public form: FormGroup;
  public messageForm: FormGroup;
  public digitalSignatureType = 'DigitalSignature';
  public maxPage: number = 3;
  public pageCount: number = 1;
  public dataByINN = [];
  public orgDataForm: FormGroup;
  public orgData: AgentSuggestionsInterface;
  public personalDataForm: FormGroup;
  public documents: FormGroup;
  public docType: string;
  public tabIndex = '1';
  private viewChange = false;
  private titleInfo = { create: null, update: null, status: null };
  public viewingData: DemandInterface<any>;
  public filesWithTypes: any[] = [];
  public readFiles: FileReadOptions[];
  public isSubmitting$ = new BehaviorSubject<boolean>(false);
  public loading$ = new BehaviorSubject<boolean>(false);

  private uploadedFiles: Set<string> = new Set();

  constructor(
    public dialogRef: MatDialogRef<DemandSignatureDrawerComponent>,
    private toaster: ToasterService,
    private getAgentRequestService: GetAgentRequestService,
    private requestCreateSuccessModalService: RequestCreateSuccessModalService,
    private requestFailureModalService: RequestFailureModalService,
    private demandSignatureDrawerStaticService: DemandSignatureDrawerStaticService,
    private demandService: DemandService,
    private fb: FormBuilder,
    private au: AutoUnsubscribeService,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
  }

  ngOnInit() {
    const modalData = this.data.data;

    this.initOrgDataForm();
    this.initPersonalDataForm();
    this.initMessageForm();

    this.getDataByINN().pipe(tap((data) => this.setDataToOrgForm(data?.data))).subscribe();

    // Если редактирование ИЛИ просмотр, тогда тянем данные с АПИ
    if (modalData?.isEdit || modalData?.isView) {
      this.getByID(modalData.id, modalData.isEdit);
    }

    // Если создание и нет черновика
    if (modalData?.isCreation && !modalData?.id) {
      // инициализируем черновик
      this.initDraft();
      // Запрашиваем метод prepare для предзаполнения инпутов
      this.prepareDemandByTypes(modalData.prepareTypeId);

    }

    // Если создание и есть черновик
    if (modalData?.isCreation || modalData?.isEdit) {
      // Включаем авто сохранение первого/второго таба
      this.enableAutoSaveDraft(this.orgDataForm);
    }
  }

  private initMessageForm() {
    this.messageForm = this.fb.group({
      FileCode: [''],
      Comment: ['', Validators.required]
    });
  }

  public initOrgDataForm() {
    this.orgDataForm = this.fb.group({
      INN: [null, [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
      Type: [null, Validators.required],
      ShortTitle: [null, Validators.required],
      FullTitle: [null, Validators.required],
      KPP: [null, Validators.required],
      OGRN: [null, Validators.required],
      OKPO: [null, Validators.required],
      Phone: [null, [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      Email: [null, [Validators.required, Validators.email]],
      LegalAddress: [null, Validators.required],
      FactAddress: [null, Validators.required],
      FactAddressEquals: [null]
    });
    if(this.isView) {
      this.orgDataForm.disable();
    }
  }

  public getDataByINN() {
    return this.orgDataForm.get('INN')?.valueChanges.pipe(
      filter(() => this.pageCount === 1),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestService.getAgentData(value)),
      map((options) => {
        this.dataByINN = options.suggestions || [];
        this.orgData = this.dataByINN.find((option) => this.orgDataForm.get('INN').value === option?.data?.inn);
        return this.orgData;
      }),
      takeUntil(this.au.destroyer)
    );
  }

  public initPersonalDataForm() {
    this.personalDataForm = this.fb.group({
      NameFirst: [null, Validators.required],
      NameLast: [null, Validators.required],
      NameSecond: [null, Validators.required],
      Male: [false],
      Female: [false],
      INN: [null, Validators.required],
      SNILS: [null, Validators.required],
      BirthDate: [null, Validators.required],
      BirthPlace: [null, Validators.required],
      Role: [null, Validators.required],
      Phone: [null, [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      Email: [null, [Validators.required, Validators.email]],
      Nationality: [null, Validators.required],
      PassportDate: [null, Validators.required],
      PassportSeriesAndNumber: [null, Validators.required],
      IssuerCode: [null, Validators.required],
      IssuerTitle: [null, Validators.required],
      AllDocuments: this.fb.group({
        documentsScan: this.fb.array([]),
        completedAppScan: this.fb.array([])
      })
    });

    if(this.isView) {
      this.personalDataForm.disable();
    }

    this.addSingleChoiceGender();
  }

  get date(): { create: string, update: string, status: string } {
    return this.titleInfo;
  }

  get isView(): boolean {
    return this.data.data.isView;
  }

  get isEdit(): boolean {
    return this.data.data.isEdit;
  }

  get isChangeByView(): boolean {
    return this.isView && !this.viewChange;
  }

  deleteFile() {
    const modalData = this.data.data;
    this.getByID(modalData.id, modalData.isEdit);
  }

  private getByID(id: number, isDraft: boolean): void {
    this.loading$.next(true);
    const req$ = isDraft ?
      this.demandService.getDemandDraftById(id) : this.demandService.getDemandById(id);
      req$.pipe(
        tap(res => {
          const data = isDraft ? res.DemandData : res.Data;
          if (this.isView) {
            this.readFiles = res?.Files?.map(file => ({ FileName: file.FileName, Size: file.Size }));
            this.viewingData = res;
            const files = data?.Files || res?.Files || []
            this.fileTypeConversion(files);
          }
          this.titleInfo = { create: res.DateCreated, update: res.DateModify, status: this.getStatus(res.Status) };
          this.patchData(data);

        }),
        finalize(() => this.loading$.next(false))
      )
      .subscribe();
  }

  private patchData(data: any) {
    const organization = data.Organization;
    const person = data.Person;
    const passport = data.Passport;
    this.orgDataForm.patchValue({
      INN: organization?.Requisites.INN,
      Type: organization?.Type,
      ShortTitle: organization?.ShortTitle,
      FullTitle: organization?.FullTitle,
      KPP: organization?.Requisites.KPP,
      OGRN: organization?.Requisites.OGRN,
      OKPO: organization?.Requisites.OKPO,
      Phone: organization?.Phone,
      Email: organization?.Email,
      LegalAddress: organization?.LegalForm,
      FactAddress: this.getFullAddress(organization?.FactAddress),
      FactAddressEquals: organization?.FactAddressEquals
    });

    this.personalDataForm.patchValue({
      NameFirst: person?.NameFirst,
      NameLast: person?.NameLast,
      NameSecond: person?.NameSecond,
      Male: !!person?.NameSecond,
      Female: !!!person?.NameSecond,
      INN: person?.INN,
      SNILS: person?.SNILS,
      BirthDate: person?.BirthDate,
      BirthPlace: person?.BirthPlace,
      Role: data.PersonPosition,
      Phone: person?.Phone,
      Email: person?.Email,
      Nationality: person?.Address,
      PassportDate: passport?.Date.split('T')[0],
      PassportSeriesAndNumber: passport?.Number.split(' ').join(' '),
      IssuerCode: passport?.IssuerCode,
      IssuerTitle: passport?.IssuerTitle
    });

    const docs = this.personalDataForm.get('AllDocuments');

    for (let x of (data?.Files ?? [])) {
      if (x.Identifier === 'documentsScan') {
        const control: FormGroup = this.fb.group({
          ID: [null],
          Identifier: [null],
          Code: [null],
          FileName: [null],
          Size: [null],
          DemandFileID: [null]
        });
        if (this.isView) {
          control.disable()
        }
        control.patchValue(x);
        (docs.get('documentsScan') as FormArray).push(control);
      } else if (x.Identifier === 'completedAppScan') {
        const control: FormGroup = this.fb.group({
          ID: [null],
          Identifier: [null],
          Code: [null],
          FileName: [null],
          Size: [null],
          DemandFileID: [null]
        });
        if (this.isView) {
          control.disable()
        }
        control.patchValue(x);
        (docs.get('completedAppScan') as FormArray).push(control);
      }
    }

  }

  private getFullAddress(address: AddressInterface): string {

    if (!address) {
      return null;
    }
    const { Country, RegionTitle, Street, House } = address || {};
    return `${Country || ''}, ${RegionTitle || ''}, ${Street || ''} ${House || ''}`;
  }

  private fileTypeConversion(files: any[]) {
    if (files.length) {
      const filesWithTypes = {};
      files.forEach(file => {
        const acc = [];
        acc.push(file);
        if (filesWithTypes[file.Identifier]) {
          filesWithTypes[file.Identifier].push(...acc);
        } else {
          filesWithTypes[file.Identifier] = acc;
        }
        this.filesWithTypes.push({
          identifier: file.Identifier,
          files: filesWithTypes[file.Identifier]
        });
      });

      this.filesWithTypes = this.filesWithTypes.filter((obj, idx, arr) =>
        arr.findIndex(t => JSON.stringify(t) === JSON.stringify(obj)) === idx);
    }
  }

  public addSingleChoiceGender() {
    this.personalDataForm.get('Male')?.valueChanges.pipe(
      filter(Boolean),
      takeUntil(this.au.destroyer)
    ).subscribe(value => {
      this.personalDataForm.get('Female').setValue(false);
    });

    this.personalDataForm.get('Female')?.valueChanges.pipe(
      filter(Boolean),
      takeUntil(this.au.destroyer)
    ).subscribe(value => {
      this.personalDataForm.get('Male').setValue(false);
    });
  }

  public nextPage(withSwitch = true) {

    if (this.pageCount <= this.maxPage - 1) {
      if (withSwitch) {
        this.pageCount += 1;
      }

      if (this.pageCount === 2 && this.orgData?.data) {
        this.setDataToOrgForm(this.orgData.data);
      }
    }
    if (this.pageCount === 1 && this.orgData?.data) {
      this.setDataToOrgForm(this.orgData.data);
    }

    if (this.pageCount === 2) {
      this.enableAutoSaveDraft(this.personalDataForm);
      this.documents = this.personalDataForm.get('AllDocuments')['controls'];
    }

    if (this.pageCount === 3) {
      this.documents = this.personalDataForm.get('AllDocuments')['controls'];
    }
  }

  addDocuments(e: { type: string, form: FormGroup }) {
    this.documents = e.form;
    this.docType = e.type;
  }

  public prevPage() {
    if (this.pageCount >= 2) {
      this.pageCount -= 1;
    }
  }

  public formIsValid(): boolean {
    switch (this.pageCount) {
      case 1:
        return this.orgDataForm.get('INN')?.valid;
      case 2:
        return this.personalDataForm?.valid
          && (this.personalDataForm.get('Male')?.value
            || this.personalDataForm.get('Female')?.value);
      case 3:
        return this.documents['completedAppScan']?.valid;
      default:
        return false;
    }
  }

 mapShortToCode(short) {
    const opfMapping = {
      "ООО": 1,
      "ЗАО": 2,
      "ПАО": 3,
      "ОАО": 4,
      "НАО": 5,
      "АО": 6,
    };

    return opfMapping[short] || null;
  }

  setDataToOrgForm(data?: AgentDataInterface) {

    if (!data) return

    let obj = {
      Type: this.mapShortToCode(data.opf?.short),
      ShortTitle: data.name?.short_with_opf,
      FullTitle: data.name?.full,
      KPP: data.kpp,
      OGRN: data.ogrn,
      OKPO: data.okpo,
      LegalAddress: data.address?.value,
      FactAddress: data.address?.value
    }

    if (!this.orgDataForm.get('Phone').value) {
      obj = Object.assign(obj, { Phone: data.phones?.length ? data.phones[0]?.value : null })
    }
    if (!this.orgDataForm.get('Email').value) {
      obj = Object.assign(obj, { Email: data.emails?.length ? data.emails[0]?.value : null })
    }

    this.orgDataForm.patchValue(obj);
  }

  get requestId(): number {
    return this.data.data.id;
  }

  set requestId(val: number) {
    this.data.data.id = val;
  }

  private resetMessageModal() {
    this.initMessageForm();
  }

  sendMessage() {
    this.isSubmitting$.next(true);
    this.demandService.sendDemandsMessage(this.messageForm.value, this.data.data.id)
      .subscribe({
        complete: () => {
          const modalData = this.data.data;
          this.getByID(modalData.id, modalData.isEdit);
          this.resetMessageModal();
          this.isSubmitting$.next(false);
        },
        error: () => {
          this.dialogRef.close();
          this.openRequestFailureModal(this.requestId);
        }
      });
  }

  private initDraft(): void {
    const payload = this.demandSignatureDrawerStaticService.payload;
    this.demandService.createNewDraft(payload)
      .pipe(
        tap(id => {
          this.requestId = id;
        })
      )
      .subscribe();
  }

  private prepareDemandByTypes(type: DemandsPrepareEnum) {
    this.loading$.next(true)
    this.demandService.prepareDemandByTypes(type).pipe(
      finalize(() => this.loading$.next(false)),
    )
      .subscribe(res => {
          this.patchData(res);
        }
      );
  }

  private uploadDraftFiles(): Observable<any> {
    let uploadObservables = [];
    if (this.docType && this.documents[this.docType]?.length) {
      uploadObservables = this.documents[this.docType]?.controls.map((control: FormGroup) => {
        const value = control.value;
        const file = value['File'];
        const fileName = file?.name;

        if (file && fileName && !this.uploadedFiles.has(fileName)) {
          return this.demandService.uploadDraftFile(file, this.docType, this.requestId).pipe(
            tap(() => this.uploadedFiles.add(fileName)),
            catchError(error => {
              console.error(`Ошибка загрузки файла ${fileName}:`, error);
              return of(null);
            })
          );
        }
        return of(null);
      });
    }

    return forkJoin(uploadObservables.filter(obs => obs !== of(null)));
  }

  private onSaveDraftSuccess(result: any): void {
    console.log('Черновик и файлы успешно сохранены:', result);
  }

  private onSaveDraftError(error: any): void {
    console.error('Ошибка при сохранении черновика или файлов:', error);
  }

  private hasFormChanged(prev: any, curr: any): boolean {
    return JSON.stringify(prev) !== JSON.stringify(curr);
  }

  private saveDraft(): Observable<any> {
    const payload = this.createDraftPayload();

    return this.demandService.updateDraft(this.requestId, payload).pipe(
      switchMap((draftResult) => {
        if (!draftResult) {
          return throwError(() => new Error('Ошибка сохранения черновика'));
        }
        return this.uploadDraftFiles();
      })
    );
  }

  private createDraftPayload(): any {
    const person = this.personalDataForm.value;
    const organization = this.orgDataForm.value;
    // const documentsWithType = person.AllDocuments
    return {
      Subject: null,
      Organization: {
        Type: organization?.Type,
        LegalForm: organization?.LegalAddress,
        FullTitle: organization?.FullTitle,
        ShortTitle: organization?.ShortTitle,
        ForeignTitle: null,
        Phone: organization?.Phone,
        Email: organization?.Email,
        Website: null,
        LegalAddress: {
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        },
        PostAddress: {
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        },
        FactAddressEquals: organization?.FactAddressEquals,
        PostAddressEquals: true,
        FactAddress: {
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        },
        Requisites: {
          LegalForm: organization?.LegalAddress,
          INN: organization?.INN,
          KPP: null,
          OGRN: organization?.OGRN,
          OKPO: organization?.OKPO,
          OKATO: null,
          OKVED: null,
          OKOGU: null,
          Signer: {
            FIO: null,
            Position: null,
            Reason: null,
            Person: null,
            Passport: null,
            RegistrationAddress: null
          },
          AccountManager: null,
          BankAccount: {
            Bank: null,
            COR: null,
            BIK: null,
            Number: null
          },
          RegistrationDate: null,
          SalesManagerID: null,
          RegistrationRegionID: null
        },
        Settings: {
          BorderHour: 16,
          AgregateUnload: true,
          FabricPostingType: 1,
          SystemNameType: 1
        }
      },
      Person: {
        NameFirst: person?.NameFirst,
        NameLast: person?.NameLast,
        NameSecond: person?.NameSecond,
        Gender: person?.Male ? 0 : 1,
        Phone: person?.Phone,
        Email: person?.Email,
        SNILS: person?.SNILS,
        INN: person?.INN,
        BirthDate: person?.BirthDate,
        BirthCountryCode: null,
        BirthPlace: person?.BirthPlace,
        Address: person?.Nationality
      },
      Passport: {
        Number: person?.PassportSeriesAndNumber,
        Date: person?.PassportDate,
        Expire: null,
        IssuerTitle: person?.IssuerTitle,
        IssuerCode: person?.IssuerCode,
        IsForeign: false,
        Nationality: person?.Nationality
      },
      PersonPosition: person.Role,
      PersonalAgreement: true,
      identificationPointGuid: null,
      SkipIsDoneCheck: null,
      Type: this.digitalSignatureType
      // Files: documentsWithType || [],
    };
  }

  private enableAutoSaveDraft(form: FormGroup | AbstractControl): void {
    form?.valueChanges
      .pipe(
        filter(() => !!this.requestId), // Предпочтительно использовать requestId напрямую
        debounceTime(500), // Ждем 500 мс после окончания ввода
        distinctUntilChanged(), // Запрос будет отправлен только если данные изменились
        startWith(form.value), // Начальное значение формы
        pairwise(), // Получаем текущее и предыдущее значения формы
        filter(([prev, curr]) => this.hasFormChanged(prev, curr)), // Проверка изменений формы
        switchMap(() => this.saveDraft()) // Сохранение черновика
      )
      .subscribe({
        next: result => this.onSaveDraftSuccess(result), // Успешная обработка черновика
        error: error => this.onSaveDraftError(error) // Обработка ошибок
      });
  }

  public submitData() {
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
  }

  private openRequestFailureModal(d): void {
    this.requestFailureModalService.open(d);
  }

  private openRequestSuccessModal(): void {
    this.requestCreateSuccessModalService.open();
  }

  private getStatus(status: string): string {
    let result: string = '';
    switch (status) {
      case 'Created':
        result = 'Создан';
        break;
      case 'Completed':
        result = 'Завершен';
        break;
      case 'Processing':
        result = 'В процессе';
        break;
      case 'Rejected':
        result = 'Отклонено';
        break;
      case 'Draft':
        result = 'Черновик';
        break;
      case 'Canceled':
        result = 'Отменен';
        break;
    }
    return result;
  }
}
