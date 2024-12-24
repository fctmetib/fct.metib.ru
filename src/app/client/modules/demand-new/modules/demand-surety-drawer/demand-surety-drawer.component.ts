import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  BehaviorSubject, catchError,
  debounceTime,
  distinctUntilChanged,
  filter, finalize, forkJoin, map, merge, Observable, of, pairwise, startWith,
  switchMap, tap, throwError
} from 'rxjs';
import { ToasterService } from 'src/app/shared/services/common/toaster.service';
import { ContractedFormsEnum } from 'src/app/shared/ui-kit/contracted-forms/interfaces/contracted-forms.interface';
import { FileDnd } from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';
import { DocumentReq } from '../../../requests/interfaces/request.interface';
import { deepMerge, extractBase64 } from 'src/app/shared/services/tools.service';
import { DrawerData } from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestroyService } from '../../../../../shared/services/common/destroy.service';
import { DemandService } from '../../services/demand.service';
import { takeUntil } from 'rxjs/operators';
import { GetAgentRequestService } from '../../../../../public/service/get-agent-request.service';
import { AgentSuggestionsInterface, BankInfo } from '../../../../../public/type/agent.interface';
import { DemandSuretyDrawerStaticService } from './demand-surety-drawer-static.service';
import {
  RequestFailureModalService
} from '../../../../../shared/modules/modals/request-failure-modal/request-failure-modal.service';
import {
  RequestCreateSuccessModalService
} from '../../../../../shared/modules/modals/request-create-success-modal/request-create-success-modal.service';
import { DemandsPrepareEnum } from '../../pages/demand-new-home/demand-new-home.component';
import { FileMode } from '../../../../../shared/types/file/file-model.interface';
import { DemandInterface } from '../../types/demand.interface';
import { Properties } from 'csstype';
import { DeepPartial } from 'chart.js/types/utils';

export interface SuretyPrepareData {
  Factoring: Factoring;
  Anket: Anket;
  Type: string;
  Files: File[];
}

export interface Anket {
  Organization: Organization;
  Resident: Resident;
  Capital: Capital;
  Activity: null;
  Licenses: any[];
  Signer: Signer;
  Objectives: Objectives;
  Shareholders: any[];
  Ratings: any[];
  ContactPerson: any;
  Managerinresponse: any;
  DateUntil: null;
}

export interface Capital {
  CurrencyCode: string;
  DateBegin: string;
  Total: number;
  Payed: number;
}

export interface Objectives {
  FinancialObjective: number;
  FinancialObjectiveOther: string;
  BankRelationObjective: number;
  BankRelationObjectiveOther: string;
  TransactionsCount: string;
  TransactionsSumm: string;
  TransactionsContracts: string;
}

export interface Organization {
  Type: number;
  LegalForm: string;
  FullTitle: string;
  ShortTitle: string;
  ForeignTitle: string;
  Phone: string;
  Email: string;
  Website: string;
  LegalAddress: Address;
  PostAddress: Address;
  FactAddress: Address;
  Requisites: Requisites;
  Settings: any;
  FactAddressEquals: boolean;
  PostAddressEquals: boolean;
}

export interface Address {
  PostCode: string;
  Country: string;
  RegionTitle: string;
  RegionCode: number;
  District: string;
  City: string;
  Locality: string;
  Street: string;
  House: string;
  Appartment: string;
}

export interface Requisites {
  LegalForm: string;
  INN: string;
  KPP: string;
  OGRN: string;
  OKPO: string;
  OKATO: string;
  OKVED: string;
  OKOGU: null;
  Signer: Signer;
  AccountManager: string;
  BankAccount: BankAccount;
  RegistrationDate: string | null;
  SalesManagerID: number;
  RegistrationRegionID: number;
}

export interface BankAccount {
  Bank: string;
  COR: string;
  BIK: string;
  Number: string;
}

export interface Signer {
  FIO: null | string;
  Position: null | string;
  Reason: null | string;
  Person: Person | null;
  Passport: Passport | null;
  RegistrationAddress: Address | null;
}

export interface Passport {
  Number: string;
  Date: string;
  Expire: string;
  IssuerTitle: string;
  IssuerCode: string;
  Nationality: string;
  FileBlobId: any;
  IsForeign: boolean;
}

export interface Person {
  NameFirst: string;
  NameLast: string;
  NameSecond: string;
  Gender: number;
  Phone: string;
  Email: string;
  SNILS: string;
  INN: null;
  BirthDate: string;
  BirthCountryCode: null;
  BirthPlace: string;
  Address: null;
}

export interface Resident {
  Country: string;
  ForeignCode: string;
  IsResident: boolean;
}

export interface Factoring {
  EDI: any[];
  Products: string;
  Trademarks: string;
  Suppliers: string;
  Buyers: string;
  StaffAmount: number;
  LimitWanted: number;
  Properties: any[];
  Obligations: any[];
  Account: Account;
  AddonAccounts: any[];
  FactoringAim: number;
}

export interface Account {
  Date: string;
  Expire: null;
  Comment: string;
  Bank: string;
  COR: string;
  Number: string;
}

export interface File {
  ID: number;
  Identifier: string;
  Code: string;
  FileName: string;
  Size: number;
}


@Component({
  selector: 'mib-demand-surety-drawer',
  templateUrl: './demand-surety-drawer.component.html',
  styleUrls: ['./demand-surety-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandSuretyDrawerComponent implements OnInit {
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  public loading$ = new BehaviorSubject<boolean>(false);
  progres$ = new BehaviorSubject<number>(1);
  guaranteeType = 'Guarantee';
  progress: number = 1;
  maxPage: number = 4;
  pageCount: number = 1;
  ContractedFormsEnum = ContractedFormsEnum;
  requisites: string = '';
  contractAmountValue: number = null;
  orgData: AgentSuggestionsInterface;
  dataByINN = [];
  dataByCreditorINN = [];
  dataByDebitorINN = [];
  bankDataByName = [];
  bankData: BankInfo;
  bankAdditionalDataByName = [];
  addressDataByName = [];
  alreadySubscribedFourthPageForm = false;
  orgDataForm: FormGroup;
  bankForm: FormGroup;
  mainDataForm: FormGroup;
  form: FormGroup;
  fourthPageForm: FormGroup;
  documents: FormGroup;
  groupDocuments: FormGroup;

  preparedData?: SuretyPrepareData

  private viewChange = false;
  public tabIndex = '1';
  public viewingData: DemandInterface<{ Subject: string; Question: string; Files: [] }>;
  private titleInfo = { create: null, update: null, status: null };

  constructor(
    private demandService: DemandService,
    private toaster: ToasterService,
    private demandSrv: DemandService,
    private destroy$: DestroyService,
    private demandSuretyDrawerStaticService: DemandSuretyDrawerStaticService,
    private getAgentRequestSrv: GetAgentRequestService,
    private requestFailureModalService: RequestFailureModalService,
    private requestCreateSuccessModalService: RequestCreateSuccessModalService,
    public dialogRef: MatDialogRef<DemandSuretyDrawerComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
    const info = data?.data;
    // [Validators.required, Validators.pattern(/^[\d]+$/)]

    if (info?.isEdit) {
      this.getDemandById((info.id)).pipe(takeUntil(this.destroy$)).subscribe({
        next: res => {

        }
      });
    }
  }

  ngOnInit(): void {
    const modalData = this.data.data;

    if (modalData?.isEdit || modalData?.isCreation) {
      this.initOrgDataForm();
      this.initBankForm();
      this.initForm();
      this.initMainDataForm();
      this.initForthPageForm();
      this.initGroupDocuments();
    }
    // Если редактирование ИЛИ просмотр, тогда тянем данные с АПИ
    if (modalData?.isEdit || modalData?.isView) {
      this.getByID(modalData.id, modalData.isEdit);
    }

    // Если создание и нет черновика
    if (modalData?.isCreation && !modalData?.id) {
      // инициализируем черновик
      this.initDraft().pipe(
        // Запрашиваем метод prepare для предзаполнения инпутов
        switchMap(() => this.prepareDemandByTypes(modalData.prepareTypeId)),
        // Прям перезаписываем
        switchMap(() => this.saveDraft())
      ).subscribe();
      // Включаем авто сохранение первого/второго таба
      this.enableAutoSaveDraft(this.orgDataForm);
    }

    // Если создание и есть черновик
    if (modalData?.isCreation && modalData?.id) {
      // Включаем авто сохранение первого/второго таба
      this.enableAutoSaveDraft(this.orgDataForm);
    }

  }

  get isView(): boolean {
    return this.data.data.isView;
  }

  get requestId(): number {
    return this.data.data.id;
  }

  set requestId(val: number) {
    this.data.data.id = val;
  }

  get files(): FormArray<any> {
    return this.documents.get('Documents') as FormArray;
  }

  private getByID(id: number, isDraft: boolean): void {
    this.loading$.next(true);
    const req$ = isDraft ?
      this.demandService
        .getDemandDraftById(id) : this.demandService.getDemandById(id);
    req$.pipe(
      tap(res => {
        const data = isDraft ? res.DemandData : res.Data;
        this.preparedData = data;
        //this.formDataForChangeOnView = res.Data
        if (this.isView) {
          // this.readFiles = res?.Files?.map(file => ({FileName: file.FileName, Size: file.Size}))
          this.viewingData = res
          // this.fileTypeConversion(res?.Files)
        }
        if (!isDraft) {
          this.titleInfo = { create: res.DateCreated, update: res.DateModify, status: this.getStatus(res.Status) };
        } else {
          //this.nextPage()
          this.patchData(data);
        }
      }),
      finalize(() => this.loading$.next(false))
    )
      .subscribe();
  }

  initOrgDataForm(): void {
    this.orgDataForm = this.fb.group({
      INN: [null, [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
      Type: null,
      ShortTitle: null,
      Phone: null,
      Email: null,
      Url: null
    });
    this.getDataByINN();
  }

  /*
  * на бэке нет поля Bill
  * */
  initBankForm(): void {
    this.bankForm = this.fb.group({
      Bank: null,
      Bik: null,
      KorrespondentAccount: null,
      Bill: null,
      RegistrationDate: null
      //Comment: null
    });

    this.getBankData();
  }

  getBankData(): void {
    this.bankForm.get('Bank').valueChanges.pipe(
      filter(() => this.pageCount === 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestSrv.getBankData(value)),
      takeUntil(this.destroy$)).subscribe({
      next: val => {
        this.bankDataByName = val;
        this.bankData = this.bankDataByName.find((el) => this.bankForm.get('Bank').value === el.value);
        this.setDataToBankForm();
      }
    });
  }

  getAdditionalBankData(index: number): void {
    const controlsArray = this.additionalAccountForm;
    const item = controlsArray.at(index);
    item.get('bank').valueChanges.pipe(
      filter(() => this.pageCount === 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestSrv.getBankData(value)),
      takeUntil(this.destroy$)).subscribe({
      next: val => {
        this.bankAdditionalDataByName = val;
      }
    });
  }

  getFullAddressData(index: number): void {
    const controlsArray = this.houses;
    const item = controlsArray.at(index);
    item.get('fullAddress').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestSrv.getAddressData(value)),
      takeUntil(this.destroy$)).subscribe({
      next: val => {
        this.addressDataByName = val;
      }
    });
  }

  getDataByINN(): void {
    this.orgDataForm.get('INN')?.valueChanges.pipe(
      filter(() => this.pageCount === 1),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestSrv.getAgentData(value)),
      takeUntil(this.destroy$)
    ).subscribe(options => {
      this.dataByINN = options.suggestions || [];
      this.orgData = this.dataByINN.find((option) => this.orgDataForm.get('INN').value === option?.data?.inn);
    });
  }

  getDataByCreditorINN(index: number): void {
    const controlsArray = this.debt;
    const item = controlsArray.at(index);
    item.get('creditor').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestSrv.getAgentData(value)),
      takeUntil(this.destroy$)
    ).subscribe(options => {
      this.dataByCreditorINN = options.suggestions || [];
    });
  }

  getDataByDebitorINN(index: number): void {
    const controlsArray = this.fourthPageForm.get('docs') as FormArray;
    const item = controlsArray.at(index);
    item.get('debitor').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestSrv.getAgentData(value)),
      takeUntil(this.destroy$)
    ).subscribe(options => {
      this.dataByDebitorINN = options.suggestions || [];
    });
  }

  getDataContractAmount(index: number): void {
    const controlsArray = this.debt;
    const item = controlsArray.at(index);
    item.get('contractAmount').valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    )
      .subscribe(res => {
        this.contractAmountValue = res;
      });
  }

  onDocumentLoad({ file, url }: FileDnd): void {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url)
    };
    // this.addDocument(document)
  }

  nextPage(): void {
    if (this.pageCount >= 1 && this.pageCount <= this.maxPage - 1) {
      this.progress = this.progres$.value + 1;
      this.progres$.next(this.progress);
      this.pageCount = this.progress;
      console.log('next', this.progress);
    }

    if (this.pageCount === 2) {
      this.enableAutoSaveDraft(this.bankForm);
    }

    if (this.pageCount === 3) {
      this.enableAutoSaveDraft(this.mainDataForm);
    }

    if (this.pageCount === 4) {
      // подписка на загрузку документов
      this.enableAutoSaveDraft(this.groupDocuments);
    }
  }

  prevPage(): void {
    if (this.pageCount >= 2 && this.pageCount <= this.maxPage) {
      this.progress = this.progres$.value - 1;
      this.progres$.next(this.progress);
      this.pageCount = this.progress;
      console.log('prev', this.progress);
    }
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

  confirmIds(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    );
  }

  addAccount(): void {
    let control = this.additionalAccountForm;
    control.push(this.createAdditionalAccountForm());
    this.getAdditionalBankData(control.length - 1);
    this.bankAdditionalDataByName = [];
    this.watchForChangesFormArray(control);
    if (control.length === 1) {
      this.enableAutoSaveDraft(this.form);
    }
  }

  private watchForChangesFormArray(formArray: FormArray) {
    merge(...formArray.controls.map((control: AbstractControl, index: number) =>
      control.valueChanges.pipe(
        debounceTime(500),
        takeUntil(this.destroy$),
        map(value => ({ rowIndex: index, control: control, data: value })))
    )).subscribe(changes => {
      this.enableAutoSaveDraft(formArray);
    });
  }

  deleteAccount(idx: number) {
    let control = this.additionalAccountForm;
    control.removeAt(idx);
  }

  accountEdit(idx: number): void {
    this.additionalAccountForm['controls'][idx].enable();
  }

  saveAccountData(idx: number): void {
    const control = this.additionalAccountForm;
    const accountGroup = control.at(idx) as FormGroup;
    accountGroup.disable();
  }

  canselAccountData(idx: number): void {
    const control = this.additionalAccountForm;
    const accountGroup = control.at(idx) as FormGroup;
    accountGroup.reset();
  }

  saveRealtyData(idx: number): void {
    const control = this.houses;
    const accountGroup = control.at(idx) as FormGroup;
    accountGroup.disable();
  }

  canselRealtyData(idx: number): void {
    const control = this.houses;
    const accountGroup = control.at(idx) as FormGroup;
    accountGroup.reset();
  }

  addRealty(): void {
    let control = this.houses;
    control.push(this.fb.group({
      fullAddress: null,
      owner: true
    }));
    this.getFullAddressData(control.length - 1);
    this.addressDataByName = [];
    this.watchForChangesFormArray(control);
    this.checkAlreadySubscribedFourthPageForm();
  }

  saveDebentures(idx: number): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    );
  }

  cancelDebentures(idx: number): void {
    let control = this.debt;
    control.controls[idx].reset();
  }

  addDebentures(): void {
    let control = this.debt;
    control.push(this.fb.group({
      creditor: null,
      contractAmount: null,
      commitmentType: null,
      dateEnd: null,
      balanceEnd: null,
      balanceToday: null
    }));
    this.checkAlreadySubscribedFourthPageForm();
    this.getDataByCreditorINN(control.length - 1);
    this.getDataContractAmount(control.length - 1);
    this.watchForChangesFormArray(control);
    this.dataByCreditorINN = [];
  }

  deleteDebt(idx: number): void {
    let control = this.debt;
    control.removeAt(idx);
  }

  addDocuments(e: any) {
    this.documents = e.controls;
  }

  private checkAlreadySubscribedFourthPageForm() {
    if (!this.alreadySubscribedFourthPageForm) {
      this.alreadySubscribedFourthPageForm = true;
      this.enableAutoSaveDraft(this.fourthPageForm);
    }
  }

  addEdms(): void {
    let control = this.docs;
    control.push(this.fb.group({
      debitor: null,
      provider: null
    }));
    this.checkAlreadySubscribedFourthPageForm();
    this.getDataByDebitorINN(control.length - 1);
    this.watchForChangesFormArray(control);
    this.dataByDebitorINN = [];
  }

  deleteEdm(idx: number): void {
    let control = this.docs;
    control.removeAt(idx);
  }

  cancelEdms(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    );
  }

  saveEdms(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    );
  }

  setDataToBankForm() {
    if (this.bankData?.data) {
      const data = this.bankData.data;
      this.bankForm.patchValue({
        Bik: data.bic,
        KorrespondentAccount: data.correspondent_account
      });
    }
  }


  setDataToOrgForm(): void {
    if (this.orgData?.data) {
      const data = this.orgData.data;
      this.orgDataForm.patchValue({
        Type: data.type,
        ShortTitle: data.name?.short_with_opf,
        Phone: data.phones?.length ? data.phones[0].value : null,
        Email: data.emails?.length ? data.emails[0].value : null,
        Url: null
      });
    }
  }

  deleteHouse(idx: number) {
    let control = this.houses;
    control.removeAt(idx);
  }

  private initForm() {
    this.form = this.fb.group({
      additionalAccountForm: this.fb.array([])
    });
  }

  private initMainDataForm(): void {
    this.mainDataForm = this.fb.group({
      typeProducts: null,
      trademarks: null,
      suppliers: null,
      limit: null,
      countEmpl: null
    });
  }

  private initForthPageForm() {
    this.fourthPageForm = this.fb.group({
      houses: this.fb.array([]),
      debt: this.fb.array([]),
      docs: this.fb.array([])
    });
  }

  private get houses(): FormArray {
    return this.fourthPageForm.get('houses') as FormArray;
  }

  private get debt(): FormArray {
    return this.fourthPageForm.get('debt') as FormArray;
  }

  private get docs(): FormArray {
    return this.fourthPageForm.get('docs') as FormArray;
  }

  private initGroupDocuments() {
    this.groupDocuments = this.fb.group({
      charter: this.fb.array([]),
      ceoPassport: this.fb.array([]),
      foundingDecision: this.fb.array([]),
      appointmentOrder: this.fb.array([]),
      balanceSheet: this.fb.array([]),
      turnoverBalanceSheet: this.fb.array([]),
      foundersPassports: this.fb.array([])
    });
  }

  private get additionalAccountForm(): FormArray {
    return this.form.get('additionalAccountForm') as FormArray;
  }

  private createAdditionalAccountForm(): FormGroup {
    return this.fb.group({
      bank: null,
      bill: null,
      createDate: null,
      closeDate: null,
      reason: null
    });
  }


  private getDemandById(id: number) {
    return this.demandSrv.getDemandDraftById(id);
  }

  private initDraft() {
    const payload = this.demandSuretyDrawerStaticService.payload;

    return this.demandService.createNewDraft(payload)
      .pipe(
        tap(id => {
          this.requestId = id;
        })
      );
  }

  private prepareDemandByTypes(type: DemandsPrepareEnum) {
    this.loading$.next(true);
    return this.demandService.prepareDemandByTypes(type)
      .pipe(
        tap(res => {
          console.log('prepareDemandByTypes=>', res);
          this.preparedData = res;
          this.patchData(res);
        }),
        finalize(() => this.loading$.next(false))
      );
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

  private patchData(data: SuretyPrepareData) {
    const anket = data.Anket.Organization;
    const factoringAccount = data.Factoring.Account;
    const factoring = data.Factoring;
    const factoringAddonAccounts = data.Factoring.AddonAccounts;
    const factoringProperties = data.Factoring.Properties;
    const factoringObligations = data.Factoring.Obligations;
    const factoringEDI = data.Factoring.EDI;
    const files = (data.Files || []) as FileMode[];

    for (let file of files) {
      const docs = this.groupDocuments.get(file.Identifier) as FormArray;
      const control = this.createDocumentControl(file);
      docs?.push(control);
    }

    console.log(this.groupDocuments.getRawValue());


    this.orgDataForm.patchValue({
      INN: anket.Requisites.INN,
      Type: anket.Type,
      ShortTitle: anket.ShortTitle,
      Phone: anket.Phone,
      Email: anket.Email,
      Url: anket.Website
    });
    this.bankForm.patchValue({
      Bank: anket.Requisites.BankAccount.Bank,
      Bik: anket.Requisites.BankAccount.BIK,
      KorrespondentAccount: anket.Requisites.BankAccount.COR,
      Bill: anket.Requisites.BankAccount.Number,
      RegistrationDate: anket.Requisites.RegistrationDate ? anket.Requisites.RegistrationDate .split('T')[0] : null
      //Comment: anket.Requisites.
    });
    this.mainDataForm.patchValue({
      typeProducts: factoring.Products,
      trademarks: factoring.Trademarks,
      suppliers: factoring.Suppliers,
      limit: factoring.LimitWanted,
      countEmpl: factoring.StaffAmount
    });

    factoringAddonAccounts.forEach(item => {
      if (item.Bank || item.Number || item.Date || item.Expire || item.Comment) {
        this.additionalAccountForm.push(this.fb.group({
          bank: item.Bank,
          bill: item.Number,
          createDate: item.Date,
          closeDate: item.Expire,
          reason: item.Comment
        }));
      }
    });

    factoringProperties.forEach(item => {
      if (item.Address.City || item.Type) {
        this.houses.push(this.fb.group({
          fullAddress: item.Address.City,
          owner: item.Type
        }));
      }
    });

    factoringObligations.forEach(item => {
      if (item.Creditor || item.Type || item.Date || item.Summ || item.ReportingRest || item.CurrentRest) {
        this.debt.push(this.fb.group({
          creditor: item.Creditor,
          commitmentType: item.Type,
          dateEnd: item.Date,
          contractAmount: item.Summ,
          balanceEnd: item.ReportingRest,
          balanceToday: item.CurrentRest
        }));
      }
    });
    factoringEDI.forEach(item => {
      if (item.Company || item.EDIProvider) {
        this.docs.push(this.fb.group({
          debitor: item.Company,
          provider: item.EDIProvider
        }));
      }
    });
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
        return of(draftResult);
      })
    );
  }

  private createDraftPayload(): DeepPartial<SuretyPrepareData> {
    const anket = this.orgDataForm.value;
    const account = this.bankForm.value;
    const products = this.mainDataForm.value;
    const addonAccounts = this.form.value.additionalAccountForm.map(item => {
      return {
        Date: item.createDate, // Дата открытия
        Expire: item.closeDate, // Дата закрытия
        Comment: item.reason, // Цель открытия
        Bank: item.bank, // Банк
        COR: null, // Корреспондентский счет
        Number: item.bill
      };
    });
    const fourStep = this.fourthPageForm.value;
    const properties = fourStep.houses.map(item => {
      return {
        Type: item.owner, // Собственность
        Address: { // Полный адрес объекта
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: item.fullAddress,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        }
      };
    });
    const obligations = fourStep.debt.map(item => {
      return {
        Creditor: item.creditor, // Кредитор
        Type: item.commitmentType, // Тип обязательства
        Date: item.dateEnd, // Дата погашения
        Summ: item.contractAmount, // Сумма договора
        ReportingRest: item.balanceEnd, // Остаток на дату отчетности
        CurrentRest: item.balanceToday // Остаток на текущую дату
      };
    });
    const edi = fourStep.docs.map(item => {
      return {
        Company: item.debitor, // Дебитор
        EDIProvider: item.provider // EDI-провайдер
      };
    });

    const payload = {
      Factoring: { // Запрос на поручительство (Заявка на факторинг)
        EDI: edi,
        // 4 - шаг
        Products: products.typeProducts, // Виды реализуемой продукции?
        Trademarks: products.trademarks, // Торговые марки
        Suppliers: products.suppliers, // Основные поставщики
        Buyers: null, // Продавец???
        StaffAmount: products.countEmpl, // Количество сотрудников
        LimitWanted: products.limit, // Лимит финансирования
        Properties: properties,
        Obligations: obligations,
        Account: {
          // Date: null,
          // Expire: null, // Дата закрытия
          // Comment: null, // Комментарий к запросу
          // Bank: null,
          // COR: null,
          // Number: null
        },
        AddonAccounts: addonAccounts,
        FactoringAim: 0 // Цели факторинга??
      },
      // 2 - шаг
      Anket: {
        Organization: { // Организация
          Type: anket.Type,
          // LegalForm: null,
          // FullTitle: null,
          ShortTitle: anket.ShortTitle,
          // ForeignTitle: null,
          Phone: anket.Phone,
          Email: anket.Email,
          Website: anket.Url,
          // LegalAddress: { // Юридический адрес
          //   PostCode: null,
          //   Country: null,
          //   RegionTitle: null,
          //   RegionCode: null,
          //   District: null,
          //   City: null,
          //   Locality: null,
          //   Street: null,
          //   House: null,
          //   Appartment: null
          // },
          // PostAddress: { // Почтовый адрес
          //   PostCode: null,
          //   Country: null,
          //   RegionTitle: null,
          //   RegionCode: null,
          //   District: null,
          //   City: null,
          //   Locality: null,
          //   Street: null,
          //   House: null,
          //   Appartment: null
          // },
          // FactAddressEquals: false,
          // PostAddressEquals: false,
          // FactAddress: {
          //   PostCode: null,
          //   Country: null,
          //   RegionTitle: null,
          //   RegionCode: null,
          //   District: null,
          //   City: null,
          //   Locality: null,
          //   Street: null,
          //   House: null,
          //   Appartment: null
          // },
          Requisites: { // Реквизиты организации
            // LegalForm: null,
            INN: anket.INN,
            // KPP: null,
            // OGRN: null,
            // OKPO: null,
            // OKATO: null,
            // OKVED: null,
            // OKOGU: null,
            // Signer: {
            //   FIO: null,
            //   Position: null,
            //   Reason: null,
            //   Person: null,
            //   Passport: null,
            //   RegistrationAddress: null
            // },
            // AccountManager: '',
            // 3 - шаг
            // Банковские реквизиты
            BankAccount: { // Основной счёт
              Bank: account.Bank, // Банк
              COR: account.KorrespondentAccount, // Корреспондентский счет
              BIK: account.Bik, // БИК банка
              Number: account.Bill // Номер счета
            },
            RegistrationDate: account.RegistrationDate, // Дата открытия
            // SalesManagerID: null,
            // RegistrationRegionID: null
          },
          Settings: {
            BorderHour: 16,
            AgregateUnload: true,
            fabricPostingType: 1,
            SystemNameType: 1
          }
        },
        // Resident: { // Признак резидента РФ
        //   IsResident: null,
        //   Country: null,
        //   ForeignCode: null
        // },
        // Capital: { // Уставный капитал
        //   CurrencyCode: null, // Код валюты
        //   DateBegin: null, // Дата
        //   Total: null, // Общая сумма
        //   Payed: null // Оплаченная сумма
        // },
        // Activity: null, // Активности
        // Licenses: [ // Лицензии и членство
        //   {}
        // ],
        //   Signer: { // Подписант
        //     FIO: null,
        //     Position: null,
        //     Reason: null,
        //     Person: { // Данные физ. лица
        //       NameFirst: null,
        //       NameLast: null,
        //       NameSecond: null,
        //       Gender: null,
        //       Phone: null,
        //       Email: null,
        //       SNILS: null,
        //       INN: null,
        //       BirthDate: null,
        //       BirthCountryCode: null,
        //       BirthPlace: null,
        //       Address: null
        //     },
        //     Passport: { // Паспорт
        //       Number: null,
        //       Date: null,
        //       Expire: null,
        //       IssuerTitle: null,
        //       IssuerCode: null,
        //       IsForeign: false,
        //       Nationality: null,
        //       FileBlobId: null,
        //     },
        //     RegistrationAddress: { // Адрес регистрации
        //       PostCode: null,
        //       Country: null,
        //       RegionTitle: null,
        //       RegionCode: null,
        //       District: null,
        //       City: null,
        //       Locality: null,
        //       Street: null,
        //       House: null,
        //       Appartment: null
        //     }
        //   },
        //   Objectives: {
        //     FinancialObjective: null,
        //     FinancialObjectiveOther: null,
        //     BankRelationObjective: null,
        //     BankRelationObjectiveOther: null,
        //     TransactionsCount: null,
        //     TransactionsSumm: null,
        //     TransactionsContracts: null
        //   },
        //   Shareholders: [ // Учредители
        //     {
        //       Person: null,
        //       Passport: null,
        //       Address: null,
        //       Type: null,
        //       INN: null,
        //       SharePercent: null
        //     }
        //   ],
        //   Ratings: [ // Рейтинг
        //     {}
        //   ],
        //   ContactPerson: { // Контактное лицо
        //     NameFirst: null,
        //     NameLast: null,
        //     NameSecond: null,
        //     Gender: null,
        //     Phone: null,
        //     Email: null,
        //     SNILS: null,
        //     INN: null,
        //     BirthDate: null,
        //     BirthCountryCode: null,
        //     BirthPlace: null,
        //     Address: null
        //   },
        //   Managerinresponse: { // Контакт менеджер
        //     NameFirst: null,
        //     NameLast: null,
        //     NameSecond: null,
        //     Gender: null,
        //     Phone: null,
        //     Email: null,
        //     SNILS: null,
        //     INN: null,
        //     BirthDate: null,
        //     BirthCountryCode: null,
        //     BirthPlace: null,
        //     Address: null
        //   },
        //   DateUntil: null
        // },
        // Type: this.guaranteeType, // Тип данных запрос
        // Files: null // Список файлов
      }
    }

    const data = deepMerge(JSON.parse(JSON.stringify(this.preparedData)), payload)

    return data
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

  // Просмотр запроса на поручительство

  get isChangeByView(): boolean {
    return this.isView;
  }

  get height() {
    return `55vh`;
  }

  identify(index, item) {
    return item.DemandMessageID;
  }

  public skeleton: Properties = {
    borderRadius: '8px',
    height: '95px',
    width: '100%'
  };

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


  deleteFile() {
    const modalData = this.data.data;
    this.getByID(modalData.id, modalData.isEdit);
  }

  get date(): { create: string, update: string, status: string } {
    console.log(this.titleInfo);
    return this.titleInfo;
  }
}
