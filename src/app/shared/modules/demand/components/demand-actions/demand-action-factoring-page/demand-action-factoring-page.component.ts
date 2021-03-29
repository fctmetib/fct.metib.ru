import { DemandObligationInterface } from './../../../types/common/demand-obligation.interface';
import { DemandEDIInterface } from './../../../types/common/demand-edi.interface';
import { FileModeInterface } from './../../../../../types/file/file-model.interface';
import { CommonService } from './../../../../../services/common/common.service';
import { DemandService } from '../../../services/demand.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { CreateDemandFactoringRequestInterface } from '../../../types/requests/create-demand-factoring-request.interface';
import { DemandPropertiesInterface } from '../../../types/common/demand-properties.interface';
import { DemandAddonAccountInterface } from '../../../types/common/demand-addon-account.interface';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { createDemandFactoringAction } from '../../../store/actions/createDemand.action';
import { errorSelector, isLoadingSelector } from '../../../store/selectors';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-demand-action-factoring-page',
  templateUrl: './demand-action-factoring-page.component.html',
  styleUrls: ['./demand-action-factoring-page.component.scss'],
})
export class DemandActionFactoringPageComponent implements OnInit {
  public isUserVerified: boolean;

  public formFactoring: FormGroup;
  public formAddress: FormGroup;

  public files: FileModeInterface[] = [];

  public organizationTypes: DemandSelectboxInterface[] = [];
  public ruleTypes: DemandSelectboxInterface[] = [];
  public typesOfOwner: DemandSelectboxInterface[] = [];
  public countryList: DemandSelectboxInterface[];
  public regionList: DemandSelectboxInterface[];

  public alert: boolean;
  public alertMessage: string;
  public addressDialog: boolean = false;

  private currentAddressFormId: any;

  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public backendErrors$: Observable<string | null>;

  constructor(
    private currencyPipe: CurrencyPipe,
    private authService: AuthService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private store: Store,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();
  }

  ngOnDestroy() {}

  onSubmit() {
    let data: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> = this.prepareData();
    this.store.dispatch(createDemandFactoringAction({ data }));
  }

  //#region public page actions

  addOtherBank(): void {
    let otherBanks = this.formFactoring.get('otherBanks') as FormArray;
    otherBanks.push(
      this.fb.group({
        otherBankAccountOpenDate: ['', [Validators.required]],
        otherBankAccountCloseDate: ['', [Validators.required]],
        otherBankName: ['', [Validators.required]],
        otherBankOwnerAccount: ['', [Validators.required]],
        otherBankTarget: ['', [Validators.required]],
      })
    );
  }

  addOtherPlace(): void {
    let factoringPlaces = this.formFactoring.get(
      'factoringPlaces'
    ) as FormArray;
    factoringPlaces.push(
      this.fb.group({
        displayAddress: '',
        factoringPlacesAddress: {
          PostCode: '',
          Country: 'Российская Федерация',
          RegionCode: 77,
          RegionTitle: '',
          City: 'Москва',
          District: '',
          Locality: '',
          Street: '',
          House: '',
          Appartment: '',
        },
        factoringPlacesLegalForm: ['Own', [Validators.required]],
      })
    );

    this.updateDisplayAddress(factoringPlaces.length - 1);
  }

  addFactoringCredits(): void {
    let factoringCredits = this.formFactoring.get(
      'factoringCredits'
    ) as FormArray;
    factoringCredits.push(
      this.fb.group({
        factoringCreditsCreditor: [''],
        factoringPlacesTypeDuty: [''],
        factoringPlacesDateClose: [''],
        factoringPlacesContractSum: [''],
        factoringPlacesBalanceReport: [''],
        factoringPlacesBalanceCurrent: [''],
      })
    );
  }

  addEDIProvider(): void {
    let factoringEDIProviders = this.formFactoring.get(
      'factoringEDIProviders'
    ) as FormArray;
    factoringEDIProviders.push(
      this.fb.group({
        factoringEDIProvidersDebitor: ['', [Validators.required]],
        factoringEDIProvidersProvider: ['', [Validators.required]],
      })
    );
  }

  remove(i: number, type: string): void {
    let other = this.formFactoring.get(type) as FormArray;
    other.removeAt(i);
  }

  //TODO: Replace it in modules/modals/address-modal
  openAddressForm(index) {
    this.currentAddressFormId = index;
    let addresses = this.formFactoring.value.factoringPlaces;
    let address = addresses[index].factoringPlacesAddress;

    this.formAddress.patchValue(address);
    this.addressDialog = true;
  }

  closeModal() {
    this.addressDialog = false;
  }

  saveAddress() {
    this.formFactoring.value.factoringPlaces[
      this.currentAddressFormId
    ].factoringPlacesAddress = this.formAddress.value;

    this.updateDisplayAddress(this.currentAddressFormId);

    this.addressDialog = false;
    this.formAddress.reset();
    this.currentAddressFormId = null;
  }

  onSelect(event, type: string) {
    let files: File[] = event.files;

    for (let file of files) {
      let guid = Guid.newGuid();

      this.commonService.getBase64(file).subscribe((res) => {
        this.fileService
          .uploadFileChunks(res, file.name, file.size.toString(), guid)
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
          );
      });
    }
  }

  onRegionChanged(value) {
    if (value) {
      let regionTitle = this.regionList.find((x) => x.value === value);
      this.formAddress.patchValue({
        RegionTitle: regionTitle,
      });
    }
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
    //TODO: Break on other pages

    this.formAddress = this.fb.group({
      PostCode: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      RegionCode: [0, [Validators.required]],
      RegionTitle: ['', [Validators.required]],
      City: ['', [Validators.required]],
      District: ['', [Validators.required]],
      Locality: ['', [Validators.required]],
      Street: ['', [Validators.required]],
      House: ['', [Validators.required]],
      Appartment: ['', [Validators.required]],
    });

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
      factoringFinanceLimit: [''],
      factoringClients: ['', [Validators.required]],
      factoringWorkers: [0, [Validators.required]],

      factoringPlaces: this.fb.array([]),

      factoringCredits: this.fb.array([]),

      factoringEDIProviders: this.fb.array([]),
    });

    this.formFactoring.valueChanges.subscribe((form) => {
      if (form.factoringFinanceLimit) {
        this.formFactoring.patchValue(
          {
            factoringFinanceLimit: this.currencyPipe.transform(
              form.factoringFinanceLimit.replace(/\D/g, '').replace(/^0+/, ''),
              'RUB',
              'symbol',
              '1.0-0'
            ),
          },
          { emitEvent: false }
        );
      }
    });

    this.formFactoring.markAllAsTouched();
    this.formFactoring.markAsDirty();
  }

  private updateDisplayAddress(index): void {
    let address = this.formFactoring.value.factoringPlaces[index]
      .factoringPlacesAddress;
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

    let editeAddress = (<FormArray>(
      this.formFactoring.controls['factoringPlaces']
    ))
      .at(index)
      .patchValue({
        displayAddress: result,
      });
  }

  private prepareData(): SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> {
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

    let edis = this.formFactoring.value.factoringEDIProviders;
    edis.forEach((edi) => {
      listEDI.push({
        Company: edi.factoringEDIProvidersDebitor,
        EDIProvider: edi.factoringEDIProvidersProvider,
      });
    });

    let result: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> = {
      Data: {
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
          Buyers: this.formFactoring.value.Clients,
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
      },
      DraftID: 0,
    };

    return result;
  }
  //#endregion
}
