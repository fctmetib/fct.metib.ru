import { DemandInterface } from './../../../types/demand.interface';
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
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-demand-action-factoring-page',
  templateUrl: './demand-action-factoring-page.component.html',
  styleUrls: ['./demand-action-factoring-page.component.scss'],
})
export class DemandActionFactoringPageComponent implements OnInit {
  public isUserVerified: boolean;

  public alert: boolean;
  public alertMessage: string;

  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public backendErrors$: Observable<string | null>;

  private currentDraftId: number = 0;

  public currentDemand: any;
  // Данные из компонента factoring-data
  public dataDemand: any;
  public files: any;

  private _saveDraftAction$: NodeJS.Timeout;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private demandService: DemandService,
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();

    //TODO: ADD LEAK MEMORY PROTECTION
    this.route.queryParams.subscribe((params: Params) => {
      if (params['ID']) {
        this.demandService.getDemandById(params['ID']).subscribe((resp) => {
          this.currentDemand = resp;
        });
      }
      if (params['DraftId']) {
        this.currentDraftId = params['DraftID'];
      }
    });

    this._saveDraftAction$ = setInterval(() => this.saveDraft(), 30000);
  }

  ngOnDestroy() {
    if (this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  onSubmit() {
    let data: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> = this.prepareData();
    this.store.dispatch(createDemandFactoringAction({ data }));
  }

  handleSave(event: any) {
    this.dataDemand = event;
  }

  handleFiles(event: any) {
    this.files = event;
  }

  //#region private logic
  saveDraft() {
    //TODO: ADD LEAK MEMORY PROTECTION
    this.demandService
      .addDraftById(this.currentDraftId, this.prepareDraft())
      .subscribe((resp) => {
        console.log(resp)
        this.currentDraftId = resp.ID;
        this.showSuccess();
      });
  }

  private prepareDraft(): any {
    return this.prepareCoreData();
  }

  private prepareData(): SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> {
    let data = this.prepareCoreData();
    let result: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> = {
      Data: data,
      DraftID: this.currentDraftId,
    };

    return result;
  }

  private prepareCoreData(): CreateDemandFactoringRequestInterface {
    let listEDI: DemandEDIInterface[] = [];

    let listObligations: DemandObligationInterface[] = [];
    let listAddonAccounts: DemandAddonAccountInterface[] = [];
    let listProperties: DemandPropertiesInterface[] = [];

    let properties = this.dataDemand.factoringPlaces; //.value.factoringPlaces;
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

    let obligations = this.dataDemand.value.factoringCredits;
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

    let addonAccounts = this.dataDemand.value.otherBanks;
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

    let edis = this.dataDemand.value.factoringEDIProviders;
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
          Email: this.dataDemand.value.organizationEmail,
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
          LegalForm: this.dataDemand.value.organizationLegalForm,
          Phone: this.dataDemand.value.organizationPhone,
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
            INN: this.dataDemand.value.organizationINN,
            KPP: '',
            OGRN: '',
            OKATO: '',
            OKPO: '',
          },
          ShortTitle: this.dataDemand.value.organizationShortName,
          Type: this.dataDemand.value.organizationType,
          Website: this.dataDemand.value.organizationWEB,
        },
      },
      Factoring: {
        Account: {
          BIK: this.dataDemand.value.bankBik,
          Bank: this.dataDemand.value.bankName,
          COR: this.dataDemand.value.bankCorrespondentAccount,
          Comment: this.dataDemand.value.bankComment,
          Date: new Date(this.dataDemand.value.bankAccountOpenDate),
          Expire: null,
          Number: this.dataDemand.value.bankOwnerAccount,
        },
        AddonAccounts: listAddonAccounts,
        Buyers: this.dataDemand.value.Clients,
        EDI: listEDI,
        FactoringAim: 0,
        LimitWanted: this.dataDemand.value.factoringFinanceLimit,
        Obligations: listObligations,
        Products: this.dataDemand.value.factoringProducts,
        Properties: listProperties,
        StaffAmount: this.dataDemand.value.factoringWorkers,
        Suppliers: this.dataDemand.value.factoringShipments,
        Trademarks: this.dataDemand.value.factoringTradeMarks,
      },
      Files: this.files,
      Type: 'Factoring',
    };

    return result;
  }

  private showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Черновик успешно сохранен!',
    });
  }
  //#endregion
}
