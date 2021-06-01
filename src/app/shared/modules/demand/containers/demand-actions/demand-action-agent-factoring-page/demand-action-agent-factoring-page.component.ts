import { Observable, Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { createDemandFactoringAction } from './../../../store/actions/createDemand.action';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { isLoadingSelector } from './../../../../../../auth/store/selectors';
import { FileModeInterface } from '../../../../../types/file/file-model.interface';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-demand-action-agent-factoring-page',
  templateUrl: './demand-action-agent-factoring-page.component.html',
  styleUrls: ['./demand-action-agent-factoring-page.component.scss'],
})
export class DemandActionAgentFactoringPageComponent implements OnInit {

  public isEdit: boolean = false;
  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;
  private currentDraftId: number = 0;

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

  private subscription$: Subscription = new Subscription();

  constructor(
    private currencyPipe: CurrencyPipe,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private demandService: DemandService,
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
        if (params['ID']) {
          this.fetch(params['ID']);
        }
        if (params['DraftId']) {
          this.currentDraftId = params['DraftID'];
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    let data: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> =
      this.prepareData();
    this.store.dispatch(createDemandFactoringAction({ data }));
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
    this.currentDemand.Files = this.currentDemand.Files.filter(x => x !== file)
  }

  private fetch(id: number) {
    this.subscription$.add(
      this.demandService.getDemandById(id).subscribe((resp) => {
        this.currentDemand = resp;
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
        console.log(this.currentDemand);
        this.isEdit = true;
      })
    );
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

  onBasicUploadAuto() {}

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

  onRegionChanged(value) {
    if (value) {
      let regionTitle = this.regionList.find((x) => x.value === value);
      this.formAddress.patchValue({
        RegionTitle: regionTitle,
      });
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

      factoringSuppliers: ['', [Validators.required]],
      factoringLimit: [0, [Validators.required]],
    });

    // factoringEDIProviders
    this.subscription$.add(this.formFactoring.valueChanges.subscribe((form) => {
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
    }));

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

    let result: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> =
      {
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