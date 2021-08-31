import { Router } from '@angular/router';
import { BankInterface } from './../../../../../types/common/bank.interface';
import { Observable, Subscription } from 'rxjs';
import { CurrencyPipe, formatDate } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { createDemandFactoringAction } from './../../../store/actions/createDemand.action';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { isLoadingSelector } from './../../../../../../auth/store/selectors';
import { FileModeInterface } from '../../../../../types/file/file-model.interface';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';
import { CreateDemandFactoringRequestInterface } from '../../../types/requests/create-demand-factoring-request.interface';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { DemandPropertiesInterface } from '../../../types/common/demand-properties.interface';
import { DemandAddonAccountInterface } from '../../../types/common/demand-addon-account.interface';
import { DemandObligationInterface } from '../../../types/common/demand-obligation.interface';
import { DemandEDIInterface } from '../../../types/common/demand-edi.interface';
import { select, Store } from '@ngrx/store';
import { errorSelector } from 'src/app/client/modules/requests/store/selectors';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { switchMap } from 'rxjs/operators';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { DemandService } from '../../../services/demand.service';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { DemandFactoringInterface } from '../../../types/common/demand-factoring.interface';
import { DemandAnketInterface } from '../../../types/common/demand-anket.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddressModalComponent } from '../../../components/address/address.component';
import { ExitGuard } from 'src/app/shared/services/exit.guard';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-demand-action-agent-factoring-page',
  templateUrl: './demand-action-agent-factoring-page.component.html',
  styleUrls: ['./demand-action-agent-factoring-page.component.scss'],
})
export class DemandActionAgentFactoringPageComponent
  implements OnInit, ExitGuard, OnDestroy
{
  public isEdit: boolean = false;
  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;
  private currentDraftId: number = 0;

  public isUserVerified: boolean;

  public formFactoring: FormGroup;
  public formAddress: FormGroup;

  public banksFounded: BankInterface[];
  public resultsBIK: string[];
  public resultsBankname: string[];

  public files: FileModeInterface[] = [];

  public organizationTypes: DemandSelectboxInterface[] = [];
  public ruleTypes: DemandSelectboxInterface[] = [];
  public typesOfOwner: DemandSelectboxInterface[] = [];
  public countryList: DemandSelectboxInterface[];
  public regionList: DemandSelectboxInterface[];

  public alert: boolean;
  public alertMessage = [];
  public addressDialog: boolean = false;

  private currentAddressFormId: any;

  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public backendErrors$: Observable<string | null>;

  public isLoading: boolean = false;

  private ref: DynamicDialogRef;
  private subscription$: Subscription = new Subscription();

  private _saveDraftAction$: NodeJS.Timeout;
  isView: boolean;

  constructor(
    public dialogService: DialogService,
    private currencyPipe: CurrencyPipe,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private demandService: DemandService,
    private messageService: MessageService,
    private commonService: CommonService,
    private store: Store,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.isView = params['View'] === 'true' ? true : false
        if (params['ID'] && params['Edit'] === 'false') {
          this.isLoading = true;
          this.fetch(params['ID']);
        } else {
          this.isLoading = true;
          this.getDraft();
        }
      })
    );

    this._saveDraftAction$ = setInterval(() => this.saveDraft(), 30000);
  }

  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this.router.navigate([`${baseUrl}/demand`]);
  }

  public search(event): void {
    this.subscription$.add(
      this.commonService.getBankByBIK(event.query).subscribe((data) => {
        this.banksFounded = data;
        this.resultsBIK = data.map((result) => result.BIC);
      })
    );
  }

  private saveDraft() {
    let data = this.prepareDraft();

    this.subscription$.add(
      this.demandService
        .addDraftById(this.currentDraftId, data)
        .subscribe((resp) => {
          this.currentDraftId = resp.ID;
          this.showSuccess();
        })
    );
  }

  public isFileInvalid(type: string): boolean {
    let isInvalid = false;

    // crtInds = currentFileIdentifiers
    let crtInds = this.files.map((file) => file.Identifier);
    if (crtInds.includes(type)) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
  }

  public isFilesInvalid(): boolean {
    if (this.isEdit) {
      return false;
    }

    let isInvalid = false;

    // crtInds = currentFileIdentifiers
    let crtInds = this.files.map((file) => file.Identifier);
    if (crtInds.length < 1) {
      return true;
    }

    if (
      crtInds.includes('Regulations') &&
      crtInds.includes('GenDirPassport') &&
      crtInds.includes('GenDirProtocol') &&
      crtInds.includes('GenDirOrder') &&
      crtInds.includes('Balance') &&
      crtInds.includes('OSV') &&
      crtInds.includes('Shareholders') &&
      crtInds.includes('ContractDelivery')
    ) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
  }
  public onOtherBankSelect(indexOtherBank: number, bankInfo: string) {
    let bank = this.banksFounded.find(
      (x) => x.BIC === bankInfo || x.Name === bankInfo
    );
    this.formFactoring
      .get('otherBanks')
      ['controls'][indexOtherBank].patchValue({
        otherBankName: bank.Name,
      });
  }

  public onBankSelect(bankInfo: string) {
    let bank = this.banksFounded.find(
      (x) => x.BIC === bankInfo || x.Name === bankInfo
    );
    this.formFactoring.patchValue({
      bankBik: bank.BIC,
      bankCorrespondentAccount: bank.AccountBank,
      bankName: bank.Name,
    });
  }

  public searchByBankName(event): void {
    this.subscription$.add(
      this.commonService.getBankByName(event.query).subscribe((data) => {
        this.banksFounded = data;
        this.resultsBankname = data.map((result) => result.Name);
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  onSubmit() {
    let data: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> =
      this.prepareData();
    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        window.scroll(0, 0);
        this.alertMessage = [
          {
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Запрос успешно создан.',
          },
        ];
      })
    );
    // this.store.dispatch(createDemandFactoringAction({ data }));
  }

  handleSendMessage(event: CreateDemandMessageRequestInterface) {
    this.subscription$.add(
      this.demandService
        .addMessageByDemandId(this.currentDemand.ID, event)
        .subscribe((resp) => {
          this.fetch(this.currentDemand.ID);
        })
    );
  }

  handleRemoveFile(file: FileModeInterface) {
    this.currentDemand.Files = this.currentDemand.Files.filter(
      (x) => x !== file
    );
  }

  private fetch(id: number) {
    this.subscription$.add(
      this.demandService.getDemandById(id).subscribe((resp) => {
        this.currentDemand = resp.Data;

        this.currentInformation = {
          ID: resp.ID,
          Messages: resp.Messages,
          DateCreated: resp.DateCreated,
          DateModify: resp.DateModify,
          DateStatus: resp.DateStatus,
          Steps: resp.Steps,
          Status: resp.Status,
          Type: resp.Type,
          Manager: null,
        };

        this.convertToFormData();
        this.isLoading = false;
        this.isEdit = true;
      })
    );
  }

  private getDraft() {
    this.subscription$.add(
      this.demandService
        .prepareDemandByType('AgencyFactoring ')
        .subscribe((resp) => {
          this.currentDemand = resp;
          this.convertToFormData();
          this.isLoading = false;
        })
    );
  }

  //#region public page actions

  addOtherBank(existBank?: DemandAddonAccountInterface): void {
    let otherBanks = this.formFactoring.get('otherBanks') as FormArray;
    otherBanks.push(
      this.fb.group({
        otherBankAccountOpenDate: [
          existBank ? existBank?.Date : '',
          [Validators.required],
        ],
        otherBankAccountCloseDate: [
          existBank?.Expire ? formatDate(existBank?.Expire, 'yyyy-MM-dd', 'en') : '',
        ],
        otherBankName: [existBank ? existBank?.Bank : '', [Validators.required]],
        otherBankOwnerAccount: [
          existBank ? existBank?.Number : '',
          [Validators.required],
        ],
        otherBankTarget: [
          existBank ? existBank?.Comment : '',
          [Validators.required],
        ],
      })
    );
  }

  addOtherPlace(existProp?: DemandPropertiesInterface): void {
    let factoringPlaces = this.formFactoring.get(
      'factoringPlaces'
    ) as FormArray;
    factoringPlaces.push(
      this.fb.group({
        displayAddress: '',
        factoringPlacesAddress: {
          PostCode: existProp ? existProp?.Address?.PostCode : '',
          Country: existProp
            ? existProp?.Address?.Country
            : 'Российская Федерация',
          RegionCode: existProp ? existProp?.Address?.RegionCode : 77,
          RegionTitle: existProp ? existProp?.Address?.RegionTitle : '',
          City: existProp ? existProp?.Address?.City : 'Москва',
          District: existProp ? existProp?.Address?.District : '',
          Locality: existProp ? existProp?.Address?.Locality : '',
          Street: existProp ? existProp?.Address?.Street : '',
          House: existProp ? existProp?.Address?.House : '',
          Appartment: existProp ? existProp?.Address?.Appartment : '',
        },
        factoringPlacesLegalForm: [ existProp ? existProp?.Type : '', [Validators.required]],
      })
    );

    this.updateDisplayAddress(factoringPlaces.length - 1);
  }

  addFactoringCredits(existCredit?: DemandObligationInterface): void {
    let factoringCredits = this.formFactoring.get(
      'factoringCredits'
    ) as FormArray;
    factoringCredits.push(
      this.fb.group({
        factoringCreditsCreditor: [existCredit ? existCredit?.Creditor : ''],
        factoringPlacesTypeDuty: [existCredit ? existCredit?.Type : ''],
        factoringPlacesDateClose: [
          existCredit?.Date ? formatDate(existCredit?.Date, 'yyyy-MM-dd', 'en') : '',
        ],
        factoringPlacesContractSum: [existCredit ? existCredit?.Summ : ''],
        factoringPlacesBalanceReport: [
          existCredit ? existCredit?.ReportingRest : '',
        ],
        factoringPlacesBalanceCurrent: [
          existCredit ? existCredit?.CurrentRest : '',
        ],
      })
    );
  }

  remove(i: number, type: string): void {
    let other = this.formFactoring.get(type) as FormArray;
    other.removeAt(i);
  }

  openAddressForm(index) {
    this.currentAddressFormId = index;
    let addresses = this.formFactoring.value.factoringPlaces;
    let address = addresses[index].factoringPlacesAddress;

    this.ref = this.dialogService.open(AddressModalComponent, {
      header: 'Укажите Адрес',
      width: '650px',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      styleClass: 'p-fluid',
      data: {
        address,
        index,
      },
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.formFactoring.value.factoringPlaces[
          this.currentAddressFormId
        ].factoringPlacesAddress = data;
        this.updateDisplayAddress(this.currentAddressFormId);
      }
    });
  }

  onSelect(event, type: string) {
    let files: File[] = event.target.files;

    for (let file of files) {
      let guid = Guid.newGuid();

      this.subscription$.add(
        this.commonService
          .getBase64(file)
          .pipe(
            switchMap((res) => {
              return this.fileService.uploadFileChunks(
                res,
                file.name,
                file.size.toString(),
                guid
              );
            })
          )
          .subscribe(
            (res) => {
              console.log(res);
              this.files.push({
                Code: res.Code,
                FileName: res.FileName,
                ID: res.ID,
                Size: res.Size,
                Identifier: type,
              });
            },
            (err) => console.log(err)
          )
      );
    }
  }

  removeFile(file: FileModeInterface) {
    this.files.splice(
      this.files.indexOf(this.files.find((x) => x === file)),
      1
    );
  }

  onTypeChanged(value) {
    if (value === 0) {
      this.formFactoring.patchValue({
        organizationLegalForm: null,
      });
    }
  }
  //#endregion

  //#region private logic

  private initValues(): void {
    let mibCommon = new MIBCommon();

    this.organizationTypes = mibCommon.getOrganizations();
    this.ruleTypes = mibCommon.getLegalForms();
    this.typesOfOwner = mibCommon.getTypesOfOwner();
    this.countryList = mibCommon.getCountryList();
    this.regionList = mibCommon.getRegionList();

    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(errorSelector));
  }

  private initForm(): void {
    this.formFactoring = this.fb.group({
      organizationType: [0, [Validators.required]],
      organizationLegalForm: [''],
      organizationShortName: ['', [Validators.required]],
      organizationINN: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      organizationPhone: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required, Validators.email]],
      organizationWEB: [''],

      bankBik: ['', [Validators.required]],
      bankCorrespondentAccount: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankAccountOpenDate: ['', [Validators.required]],
      bankOwnerAccount: ['', [Validators.required]],
      bankComment: [''],

      otherBanks: this.fb.array([]),

      factoringProducts: ['', [Validators.required]],
      factoringTradeMarks: ['', [Validators.required]],
      factoringShipments: ['', [Validators.required]],
      factoringFinanceLimit: [null, [Validators.required]],
      factoringClients: ['', [Validators.required]],
      factoringWorkers: [0, [Validators.required]],

      factoringPlaces: this.fb.array([]),

      factoringCredits: this.fb.array([]),

      factoringSuppliers: ['', [Validators.required]],
      factoringLimit: [0, [Validators.required]],
    });

    // factoringEDIProviders
    // this.subscription$.add(
    //   this.formFactoring.valueChanges.subscribe((form) => {
    //     if (form.factoringFinanceLimit) {
    //       this.formFactoring.patchValue(
    //         {
    //           factoringFinanceLimit: this.currencyPipe.transform(
    //             form.factoringFinanceLimit
    //               .replace(/\D/g, '')
    //               .replace(/^0+/, ''),
    //             'RUB',
    //             'symbol',
    //             '1.0-0'
    //           ),
    //         },
    //         { emitEvent: false }
    //       );
    //     }
    //   })
    // );

    this.formFactoring.markAllAsTouched();
    this.formFactoring.markAsDirty();
  }

  private updateDisplayAddress(index): void {
    let address =
      this.formFactoring.value.factoringPlaces[index].factoringPlacesAddress;
    let result = '';

    console.log(address);

    if (address.PostCode) {
      result = result + ' ' + address.PostCode;
    }
    if (address.Country) {
      result = result + ' ' + address.Country;
    }
    if (address.RegionCode) {
      result = result + ' ' + address.RegionCode;
    }
    if (address.RegionTitle) {
      result = result + ' ' + address.RegionTitle;
    }
    if (address.City) {
      result = result + ' ' + address.City;
    }
    if (address.District) {
      result = result + ' ' + address.District;
    }
    if (address.Locality) {
      result = result + ' ' + address.Locality;
    }
    if (address.Street) {
      result = result + ' ' + address.Street;
    }
    if (address.House) {
      result = result + ' ' + address.House;
    }
    if (address.Appartment) {
      result = result + ' ' + address.Appartment;
    }

    (<FormArray>this.formFactoring.controls['factoringPlaces'])
      .at(index)
      .patchValue({
        displayAddress: result,
        factoringPlacesAddress: address,
      });
  }

  private convertToFormData() {
    let factoring: DemandFactoringInterface = this.currentDemand?.Factoring;
    let anket: DemandAnketInterface = this.currentDemand?.Anket;

    let banks: DemandAddonAccountInterface[] = factoring?.AddonAccounts;
    let places: DemandPropertiesInterface[] = factoring?.Properties;
    let credits: DemandObligationInterface[] = factoring?.Obligations;

    this.formFactoring.patchValue({
      organizationType: anket?.Organization?.Type,
      organizationLegalForm: anket?.Organization?.LegalForm,
      organizationShortName: anket?.Organization?.ShortTitle,
      organizationINN: anket?.Organization?.Requisites?.INN,
      organizationPhone: anket?.Organization?.Phone,
      organizationEmail: anket?.Organization?.Email,
      organizationWEB: anket?.Organization?.Website,

      bankBik: factoring?.Account?.BIK,
      bankCorrespondentAccount: factoring?.Account?.COR,
      bankName: factoring?.Account?.Bank,
      bankAccountOpenDate: formatDate(
        factoring?.Account?.Date ? factoring?.Account?.Date : null,
        'yyyy-MM-dd',
        'en'
      ),
      bankOwnerAccount: factoring?.Account?.Number,
      bankComment: factoring?.Account?.Comment,

      factoringProducts: factoring?.Products,
      factoringTradeMarks: factoring?.Trademarks,
      factoringShipments: factoring?.Suppliers,
      factoringFinanceLimit: factoring?.LimitWanted,
      factoringClients: factoring?.Buyers,
      factoringWorkers: factoring?.StaffAmount,

      factoringSuppliers: factoring?.Suppliers,
      factoringLimit: factoring?.LimitWanted,
    });

    if (banks) {
      banks.forEach((b) => this.addOtherBank(b));
    }
    if (places) {
      places.forEach((p) => this.addOtherPlace(p));
    }
    if (credits) {
      credits.forEach((c) => this.addFactoringCredits(c));
    }
  }

  private showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Черновик успешно сохранен!',
    });
  }

  private prepareCoreData(): any {
    let listEDI: DemandEDIInterface[] = [];

    let listObligations: DemandObligationInterface[] = [];
    let listAddonAccounts: DemandAddonAccountInterface[] = [];
    let listProperties: DemandPropertiesInterface[] = [];

    let properties = this.formFactoring.value.factoringPlaces;
    properties.forEach((property) => {
      listProperties.push({
        Address: {
          Appartment: property.factoringPlacesAddress.Appartment,
          City: property.factoringPlacesAddress.City,
          Country: property.factoringPlacesAddress.Country,
          District: property.factoringPlacesAddress.District,
          House: property.factoringPlacesAddress.House,
          Locality: property.factoringPlacesAddress.Locality,
          PostCode: property.factoringPlacesAddress.PostCode,
          RegionCode: property.factoringPlacesAddress.RegionCode,
          Street: property.factoringPlacesAddress.Street,
          RegionTitle: property.factoringPlacesAddress.RegionTitle,
        },
        Comment: '',
        Type: property.factoringPlacesLegalForm,
      });
    });

    let obligations = this.formFactoring.value.factoringCredits;
    obligations.forEach((obligation) => {
      listObligations.push({
        Creditor: obligation.factoringCreditsCreditor,
        CurrentRest: obligation.factoringPlacesBalanceCurrent,
        Date: new Date(obligation.factoringPlacesDateClose),
        ReportingRest: obligation.factoringPlacesBalanceReport,
        Summ: obligation.factoringPlacesContractSum,
        Type: obligation.factoringPlacesTypeDuty,
      });
    });

    let addonAccounts = this.formFactoring.value.otherBanks;
    addonAccounts.forEach((addonAccount) => {
      listAddonAccounts.push({
        BIK: '',
        Bank: addonAccount.otherBankName,
        COR: '',
        Comment: addonAccount.otherBankTarget,
        Date: new Date(addonAccount.otherBankAccountOpenDate),
        Expire: new Date(addonAccount.otherBankAccountCloseDate),
        Number: addonAccount.otherBankOwnerAccount,
      });
    });

    let result: any = {
      Anket: {
        Registration: {
          Authority: '',
          Date: new Date(),
          InitDate: new Date(),
          Number: '',
          Place: '',
        },
        Resident: {
          Country: 'РФ',
          ForeignCode: '',
          IsResident: true,
        },
        Shareholders: [],
        Signer: {
          FactAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          Passport: {
            Date: new Date(),
            Expire: new Date(),
            IsForeign: false,
            IssuerCode: '',
            IssuerTitle: '',
            Nationality: '',
            Number: '',
          },
          Person: {
            BirthDate: new Date(),
            BirthPlace: '',
            Email: '',
            Gender: 1,
            Name: {
              First: '',
              Last: '',
              Second: '',
            },
            NameFirst: '',
            NameLast: '',
            NameSecond: '',
            Phone: '',
            SNILS: '',
          },
          PositionDate: new Date(),
          PositionTitle: '',
          RegistrationAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
        },
        Activities: [],
        Capital: {
          Total: 0,
          Payed: 0,
        },
        Licenses: [],
        Objectives: {
          BankRelationObjective: 16,
          BankRelationObjectiveOther: '',
          FinancialObjective: 1,
          FinancialObjectiveOther: '',
          TransactionsContracts: 'Договор факторинга',
          TransactionsCount: '',
          TransactionsSumm: '',
        },
        Organization: {
          Email: this.formFactoring.value.organizationEmail,
          FactAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          FactAddressEquals: false,
          ForeignTitle: '',
          FullTitle: '',
          LegalAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          LegalForm: this.formFactoring.value.organizationLegalForm,
          Phone: this.formFactoring.value.organizationPhone,
          PostAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          PostAddressEquals: false,
          Requisites: {
            INN: this.formFactoring.value.organizationINN,
            KPP: '',
            OGRN: '',
            OKATO: '',
            OKPO: '',
          },
          ShortTitle: this.formFactoring.value.organizationShortName,
          Type: this.formFactoring.value.organizationType,
          Website: this.formFactoring.value.organizationWEB,
        },
      },
      Factoring: {
        Account: {
          BIK: this.formFactoring.value.bankBik,
          Bank: this.formFactoring.value.bankName,
          COR: this.formFactoring.value.bankCorrespondentAccount,
          Comment: this.formFactoring.value.bankComment,
          Date: new Date(this.formFactoring.value.bankAccountOpenDate),
          Expire: null,
          Number: this.formFactoring.value.bankOwnerAccount,
        },
        AddonAccounts: listAddonAccounts,
        Buyers: this.formFactoring.value.factoringClients,
        EDI: listEDI,
        FactoringAim: 0,
        LimitWanted: this.formFactoring.value.factoringFinanceLimit,
        Obligations: listObligations,
        Products: this.formFactoring.value.factoringProducts,
        Properties: listProperties,
        StaffAmount: this.formFactoring.value.factoringWorkers,
        Suppliers: this.formFactoring.value.factoringShipments,
        Trademarks: this.formFactoring.value.factoringTradeMarks,
      },
      Files: this.files,
      Type: 'AgencyFactoring ',
    };

    return result;
  }

  private prepareDraft(): any {
    return this.prepareCoreData();
  }

  private prepareData(): SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> {
    let data = this.prepareCoreData();
    let result: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> =
      {
        Data: data,
        DraftID: this.currentDraftId,
      };

    return result;
  }

  //#endregion

  canDeactivate(): boolean | Observable<boolean> {
    return confirm(
      'Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?'
    );
  }
}
