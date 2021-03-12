import { FileModeInterface } from '../../../../../types/file/file-model.interface';
import { DemandService } from '../../../services/demand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

      otherBanks: [[]],

      factoringProducts: ['', [Validators.required]],
      factoringTradeMarks: ['', [Validators.required]],
      factoringShipments: ['', [Validators.required]],
      factoringFinanceLimit: ['', [Validators.required]],
      factoringClients: ['', [Validators.required]],
      factoringWorkers: [0, [Validators.required]],

      factoringPlaces: [[]],
      factoringCredits: [[]],
      factoringEDIProviders: [[]],
    });
  }

  onUpload($event: Event, type: string) {}

  onSubmit() {
    console.log(this.formFactoring.value);

    // let data: SaveDemandRequestInterface<any> = {};
    // this.demandService.add(data).subscribe((resp) => {});
  }
}
