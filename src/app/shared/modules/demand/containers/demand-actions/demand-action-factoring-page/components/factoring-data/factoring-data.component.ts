import { map } from 'rxjs/operators';
import { DemandAddonAccountInterface } from './../../../../../types/common/demand-addon-account.interface';
import { CurrencyPipe, formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { DemandEDIInterface } from 'src/app/shared/modules/demand/types/common/demand-edi.interface';
import { DemandObligationInterface } from 'src/app/shared/modules/demand/types/common/demand-obligation.interface';
import { DemandSelectboxInterface } from 'src/app/shared/modules/demand/types/common/demand-selectbox.interface';
import { CreateDemandFactoringRequestInterface } from 'src/app/shared/modules/demand/types/requests/create-demand-factoring-request.interface';
import { SaveDemandRequestInterface } from 'src/app/shared/modules/demand/types/requests/save-demand-request.interface';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { DemandPropertiesInterface } from 'src/app/shared/modules/demand/types/common/demand-properties.interface';
import { DemandFactoringInterface } from 'src/app/shared/modules/demand/types/common/demand-factoring.interface';
import { DemandAnketInterface } from 'src/app/shared/modules/demand/types/common/demand-anket.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddressModalComponent } from 'src/app/shared/modules/demand/components/address/address.component';
import { BankInterface } from 'src/app/shared/types/common/bank.interface';

@Component({
  selector: 'app-factoring-data',
  templateUrl: './factoring-data.component.html',
})
export class FactoringDataComponent implements OnInit, OnDestroy {
  @Input()
  isEdit: boolean;

  @Input()
  currentDemand: any;

  @Input()
  currentDraftId: any;

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  create: EventEmitter<any> = new EventEmitter();

  @Output()
  back: EventEmitter<any> = new EventEmitter();

  public organizationTypes: DemandSelectboxInterface[] = [];
  public ruleTypes: DemandSelectboxInterface[] = [];
  public typesOfOwner: DemandSelectboxInterface[] = [];

  public formFactoring: FormGroup;

  public banksFounded: BankInterface[];
  public resultsBIK: string[];
  public resultsBankname: string[];

  public files: FileModeInterface[] = [];

  private ref: DynamicDialogRef;
  private currentAddressFormId: any;
  private subscription$: Subscription = new Subscription();

  private _saveDraftAction$: NodeJS.Timeout;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private commonService: CommonService,
    private fileService: FileService,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.initValues();

    if (this.currentDemand) {
      this.convertToFormData();
    }

    this._saveDraftAction$ = setInterval(() => this.saveDraft(), 30000);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  onSubmit() {
    this.create.emit(this.prepareData());
  }

  saveDraft() {
    this.save.emit(this.prepareDraft());
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
      crtInds.includes('ContractDelivery') &&
      crtInds.includes('GenDirPassport') &&
      crtInds.includes('GenDirProtocol') &&
      crtInds.includes('Balance') &&
      crtInds.includes('GenDirOrder') &&
      crtInds.includes('OSV') &&
      crtInds.includes('Shareholders')
    ) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
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

  public onBack() {
    this.back.emit();
  }

  //#region public page actions

  public search(event): void {
    this.subscription$.add(
      this.commonService.getBankByBIK(event.query).subscribe((data) => {
        this.banksFounded = data;
        this.resultsBIK = data.map((result) => result.BIC);
      })
    );
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

  addOtherBank(existBank?: DemandAddonAccountInterface): void {
    let otherBanks = this.formFactoring.get('otherBanks') as FormArray;
    otherBanks.push(
      this.fb.group({
        otherBankAccountOpenDate: [
          existBank?.Date
            ? formatDate(existBank?.Date, 'yyyy-MM-dd', 'en')
            : '',
          [Validators.required],
        ],
        otherBankAccountCloseDate: [
          existBank?.Expire
            ? formatDate(existBank?.Expire, 'yyyy-MM-dd', 'en')
            : '',
        ],
        otherBankName: [
          existBank?.Bank ? existBank?.Bank : '',
          [Validators.required],
        ],
        otherBankOwnerAccount: [
          existBank?.Number ? existBank?.Number : '',
          [Validators.required],
        ],
        otherBankTarget: [
          existBank?.Comment ? existBank?.Comment : '',
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
          PostCode: existProp ? existProp.Address.PostCode : '',
          Country: existProp
            ? existProp.Address.Country
            : 'Российская Федерация',
          RegionCode: existProp ? existProp.Address.RegionCode : 77,
          RegionTitle: existProp ? existProp.Address.RegionTitle : '',
          City: existProp ? existProp.Address.City : 'Москва',
          District: existProp ? existProp.Address.District : '',
          Locality: existProp ? existProp.Address.Locality : '',
          Street: existProp ? existProp.Address.Street : '',
          House: existProp ? existProp.Address.House : '',
          Appartment: existProp ? existProp.Address.Appartment : '',
        },
        factoringPlacesLegalForm: [existProp?.Type ? existProp?.Type : '', [Validators.required]],
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
        factoringCreditsCreditor: [existCredit ? existCredit.Creditor : ''],
        factoringPlacesTypeDuty: [existCredit ? existCredit.Type : ''],
        factoringPlacesDateClose: [
          existCredit?.Date ? formatDate(existCredit?.Date, 'yyyy-MM-dd', 'en') : '',
        ],
        factoringPlacesContractSum: [existCredit ? existCredit.Summ : ''],
        factoringPlacesBalanceReport: [
          existCredit ? existCredit.ReportingRest : '',
        ],
        factoringPlacesBalanceCurrent: [
          existCredit ? existCredit.CurrentRest : '',
        ],
      })
    );
  }

  addEDIProvider(existEDI?: DemandEDIInterface): void {
    let factoringEDIProviders = this.formFactoring.get(
      'factoringEDIProviders'
    ) as FormArray;
    factoringEDIProviders.push(
      this.fb.group({
        factoringEDIProvidersDebitor: [
          existEDI ? existEDI.Company : '',
          [Validators.required],
        ],
        factoringEDIProvidersProvider: [
          existEDI ? existEDI.EDIProvider : '',
          [Validators.required],
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

  private initValues(): void {
    let mibCommon = new MIBCommon();

    this.organizationTypes = mibCommon.getOrganizations();
    this.ruleTypes = mibCommon.getLegalForms();
    this.typesOfOwner = mibCommon.getTypesOfOwner();
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

      factoringEDIProviders: this.fb.array([]),
    });

    // this.subscription$.add(
    //   this.formFactoring.valueChanges.subscribe((form) => {
    //     if (form.factoringFinanceLimit) {
    //       this.formFactoring.patchValue(
    //         {
    //           factoringFinanceLimit: this.currencyPipe.transform(
    //             form.factoringFinanceLimit
    //               .toString()
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

  private convertToFormData() {
    let factoring: DemandFactoringInterface = this.currentDemand.Factoring;
    let anket: DemandAnketInterface = this.currentDemand.Anket;

    let banks: DemandAddonAccountInterface[] = factoring.AddonAccounts;
    let places: DemandPropertiesInterface[] = factoring.Properties;
    let credits: DemandObligationInterface[] = factoring.Obligations;
    let ediProviders: DemandEDIInterface[] = factoring.EDI;

    this.formFactoring.patchValue({
      organizationType: anket.Organization.Type,
      organizationLegalForm: anket.Organization.LegalForm,
      organizationShortName: anket.Organization.ShortTitle,
      organizationINN: anket.Organization.Requisites.INN,
      organizationPhone: anket.Organization.Phone,
      organizationEmail: anket.Organization.Email,
      organizationWEB: anket.Organization.Website,

      bankBik: factoring.Account.BIK,
      bankCorrespondentAccount: factoring.Account.COR,
      bankName: factoring.Account.Bank,
      bankAccountOpenDate: formatDate(
        factoring.Account.Date,
        'yyyy-MM-dd',
        'en'
      ),
      bankOwnerAccount: factoring.Account.Number,
      bankComment: factoring.Account.Comment,

      factoringProducts: factoring.Products,
      factoringTradeMarks: factoring.Trademarks,
      factoringShipments: factoring.Suppliers,
      factoringFinanceLimit: factoring.LimitWanted,
      factoringClients: factoring.Buyers,
      factoringWorkers: factoring.StaffAmount,
    });

    banks.forEach((b) => this.addOtherBank(b));
    places.forEach((p) => this.addOtherPlace(p));
    credits.forEach((c) => this.addFactoringCredits(c));
    ediProviders.forEach((e) => this.addEDIProvider(e));
  }

  private prepareCoreData(): CreateDemandFactoringRequestInterface {
    let listEDI: DemandEDIInterface[] = [];

    let listObligations: DemandObligationInterface[] = [];
    let listAddonAccounts: DemandAddonAccountInterface[] = [];
    let listProperties: DemandPropertiesInterface[] = [];

    let properties = this.formFactoring.value.factoringPlaces; //.value.factoringPlaces;
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

    let edis = this.formFactoring.value.factoringEDIProviders;
    edis.forEach((edi) => {
      listEDI.push({
        Company: edi.factoringEDIProvidersDebitor,
        EDIProvider: edi.factoringEDIProvidersProvider,
      });
    });

    let result: CreateDemandFactoringRequestInterface = {
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
      Type: 'Factoring',
    };

    return result;
  }
}
