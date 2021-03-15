import { FileModeInterface } from '../../../../../types/file/file-model.interface';
import { DemandService } from '../../../services/demand.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';

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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
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

      otherBanks: this.fb.array([
        this.fb.group({
          otherBankAccountOpenDate: ['', [Validators.required]],
          otherBankAccountCloseDate: ['', [Validators.required]],
          otherBankName: ['', [Validators.required]],
          otherBankOwnerAccount: ['', [Validators.required]],
          otherBankTarget: ['', [Validators.required]],
        }),
      ]),

      factoringProducts: ['', [Validators.required]],
      factoringTradeMarks: ['', [Validators.required]],
      factoringShipments: ['', [Validators.required]],
      factoringFinanceLimit: ['', [Validators.required]],
      factoringClients: ['', [Validators.required]],
      factoringWorkers: [0, [Validators.required]],

      factoringPlaces: this.fb.array([
        this.fb.group({
          factoringPlacesAddress: ['', [Validators.required]],
          factoringPlacesLegalForm: ['', [Validators.required]],
        }),
      ]),

      factoringCredits: this.fb.array([
        this.fb.group({
          factoringCreditsCreditor: ['', [Validators.required]],
          factoringPlacesTypeDuty: ['', [Validators.required]],
          factoringPlacesDateClose: ['', [Validators.required]],
          factoringPlacesContractSum: ['', [Validators.required]],
          factoringPlacesBalanceReport: ['', [Validators.required]],
          factoringPlacesBalanceCurrent: ['', [Validators.required]],
        }),
      ]),

      factoringEDIProviders: this.fb.array([
        this.fb.group({
          factoringEDIProvidersDebitor: ['', [Validators.required]],
          factoringEDIProvidersProvider: ['', [Validators.required]],
        }),
      ]),
    });
  }

  onSubmit() {
    console.log(this.formFactoring.value);
  }

  onUpload($event: Event, type: string) {}

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
    let factoringPlaces = this.formFactoring.get('factoringPlaces') as FormArray;
    factoringPlaces.push(
      this.fb.group({
        factoringPlacesAddress: ['', [Validators.required]],
        factoringPlacesLegalForm: ['', [Validators.required]],
      }),
    );
  }

  addFactoringCredits(): void {
    let factoringCredits = this.formFactoring.get('factoringCredits') as FormArray;
    factoringCredits.push(
      this.fb.group({
        factoringCreditsCreditor: ['', [Validators.required]],
        factoringPlacesTypeDuty: ['', [Validators.required]],
        factoringPlacesDateClose: ['', [Validators.required]],
        factoringPlacesContractSum: ['', [Validators.required]],
        factoringPlacesBalanceReport: ['', [Validators.required]],
        factoringPlacesBalanceCurrent: ['', [Validators.required]],
      }),
    );
  }

  addEDIProvider(): void {
    let factoringEDIProviders = this.formFactoring.get('factoringEDIProviders') as FormArray;
    factoringEDIProviders.push(
      this.fb.group({
        factoringEDIProvidersDebitor: ['', [Validators.required]],
        factoringEDIProvidersProvider: ['', [Validators.required]],
      }),
    );
  }
}
