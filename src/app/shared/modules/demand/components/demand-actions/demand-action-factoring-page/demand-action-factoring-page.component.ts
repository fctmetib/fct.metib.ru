import { FileModeInterface } from './../../../../../types/file/file-model.interface';
import { CommonService } from './../../../../../services/common/common.service';
import { DemandService } from '../../../services/demand.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { CreateDemandFactoringRequestInterface } from '../../../types/requests/create-demand-factoring-request.interface';

@Component({
  selector: 'app-demand-action-factoring-page',
  templateUrl: './demand-action-factoring-page.component.html',
  styleUrls: ['./demand-action-factoring-page.component.scss'],
})
export class DemandActionFactoringPageComponent implements OnInit {
  isUserVerified: boolean;
  formFactoring: FormGroup;
  files: FileModeInterface[] = [];

  organizationTypes: DemandSelectboxInterface[] = [
    {
      title: 'Юридическое лицо',
      value: 'Юридическое лицо',
    },
    {
      title: 'ИП',
      value: 'ИП',
    },
  ];
  ruleTypes: DemandSelectboxInterface[] = [
    {
      title: 'ООО',
      value: 'ООО',
    },
  ];

  alert: boolean;
  alertMessage: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private fileService: FileService,
    private demandService: DemandService
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
  }

  ngOnDestroy() {}

  initForm() {
    this.formFactoring = this.fb.group({
      organizationType: ['', [Validators.required]],
      organizationLegalForm: ['', [Validators.required]],
      organizationShortName: ['', [Validators.required]],
      organizationINN: ['', [Validators.required]],
      organizationPhone: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required]],
      organizationWEB: ['', [Validators.required]],

      bankBik: ['', [Validators.required]],
      bankCorrespondentAccount: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankAccountOpenDate: ['', [Validators.required]],
      bankOwnerAccount: ['', [Validators.required]],
      bankComment: ['', [Validators.required]],

      otherBanks: this.fb.array([]),

      factoringProducts: ['', [Validators.required]],
      factoringTradeMarks: ['', [Validators.required]],
      factoringShipments: ['', [Validators.required]],
      factoringFinanceLimit: ['', [Validators.required]],
      factoringClients: ['', [Validators.required]],
      factoringWorkers: [0, [Validators.required]],

      factoringPlaces: this.fb.array([]),

      factoringCredits: this.fb.array([]),

      factoringEDIProviders: this.fb.array([]),
    });
  }

  onSubmit() {
    console.log(this.formFactoring.value);

    //TODO: need to link data with form

    let data: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface> = {
      Data: {
        Anket: {
          Registration: {
            Authority: '',
            Date: new Date(),
            InitDate: new Date(),
            Number: '',
            Place: ''
          },
          Resident: {
            Country: '',
            ForeignCode: '',
            IsResident: false
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
              Street: ''
            },
            Passport: {
              Date: new Date(),
              Expire: new Date(),
              IsForeign: false,
              IssuerCode: '',
              IssuerTitle: '',
              Nationality: '',
              Number: ''
            },
            Person: {
              BirthDate: new Date(),
              BirthPlace: '',
              Email: '',
              Gender: 1,
              Name: {
                First: '',
                Last: '',
                Second: ''
              },
              NameFirst: '',
              NameLast: '',
              NameSecond: '',
              Phone: '',
              SNILS: ''
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
              Street: ''
            },
          },
          Activities: [],
          Capital: {
            Total: 0,
            Payed: 0,
          },
          Licenses: [],
          Objectives: {
            BankRelationObjective: 0,
            BankRelationObjectiveOther: '',
            FinancialObjective: 0,
            FinancialObjectiveOther: '',
            TransactionsContracts: '',
            TransactionsCount: '',
            TransactionsSumm: ''
          },
          Organization: {
            Email: '',
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
              Street: ''
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
              Street: ''
            },
            LegalForm: '',
            Phone: '',
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
              Street: ''
            },
            PostAddressEquals: false,
            Requisites: {
              INN: '',
              KPP: '',
              OGRN: '',
              OKATO: '',
              OKPO: ''
            },
            ShortTitle: '',
            Type: 0,
            Website: ''
          }
        },
        Factoring: {
          Account: {
            BIK: '',
            Bank: '',
            COR: '',
            Comment: '',
            Date: new Date(),
            Expire: new Date(),
            Number: ''
          },
          AddonAccounts: [
            {
              BIK: '',
              Bank: '',
              COR: '',
              Comment: '',
              Date: new Date(),
              Expire: new Date(),
              Number: ''
            }
          ],
          Buyers: '',
          EDI: [{
            Company: '',
            EDIProvider: ''
          }],
          FactoringAim: 0,
          LimitWanted: 0,
          Obligations: [{
            Creditor: '',
            CurrentRest: 0,
            Date: new Date(),
            ReportingRest: 0,
            Summ: 0,
            Type: ''
          }],
          Products: '',
          Properties: [{
            Address: {
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
            Comment: '',
            Type: ''
          }],
          StaffAmount: 0,
          Suppliers: '',
          Trademarks: ''
        },
        Files: this.files,
        Type: "Factoring"
      },
      DraftID: 0
    };

    this.demandService.add(data).subscribe(resp => {
      this.alert = true;
      this.alertMessage = 'Запрос успешно добавлен!'
    });
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
                Identifier: type
              })
            },
            (err) => console.log(err)
          );
      });
    }
  }

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
        factoringPlacesAddress: ['', [Validators.required]],
        factoringPlacesLegalForm: ['', [Validators.required]],
      })
    );
  }

  addFactoringCredits(): void {
    let factoringCredits = this.formFactoring.get(
      'factoringCredits'
    ) as FormArray;
    factoringCredits.push(
      this.fb.group({
        factoringCreditsCreditor: ['', [Validators.required]],
        factoringPlacesTypeDuty: ['', [Validators.required]],
        factoringPlacesDateClose: ['', [Validators.required]],
        factoringPlacesContractSum: ['', [Validators.required]],
        factoringPlacesBalanceReport: ['', [Validators.required]],
        factoringPlacesBalanceCurrent: ['', [Validators.required]],
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
    other.removeAt(i)
  }
}
