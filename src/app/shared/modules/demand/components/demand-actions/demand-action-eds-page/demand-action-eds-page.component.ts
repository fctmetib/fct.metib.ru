import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-demand-action-eds-page',
  templateUrl: './demand-action-eds-page.component.html',
  styleUrls: ['./demand-action-eds-page.component.scss'],
})
export class DemandActionEDSPageComponent implements OnInit {

  isUserVerified: boolean;
  formEDS: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
  }

  ngOnDestroy() {}

  initForm() {
    this.formEDS = this.fb.group({
      organizationType: ['', [Validators.required]],
      organizationLegalForm: ['', [Validators.required]],
      organizationShortName: ['', [Validators.required]],
      organizationFullName: ['', [Validators.required]],
      organizationINN: ['', [Validators.required]],
      organizationKPP: ['', [Validators.required]],
      organizationOGRN: ['', [Validators.required]],
      organizationOKPO: ['', [Validators.required]],
      organizationPhone: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required]],
      organizationWEB: ['', [Validators.required]],
      organizationLegalAddress: ['', [Validators.required]],
      organizationIsActualAdressEqual: [false],

      organizationActualAddress: ['', [Validators.required]],
      organizationIsLegalAdressEqual: [false],

      ownerSurname: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerMiddlename: ['', [Validators.required]],
      ownerGender: ['', [Validators.required]],
      ownerSNILS: ['', [Validators.required]],
      ownerDateBurn: ['', [Validators.required]],
      ownerPlaceBurn: ['', [Validators.required]],
      ownerPhone: ['', [Validators.required]],
      ownerWorkPosition: ['', [Validators.required]],
      ownerEmail: ['', [Validators.required]],
      ownerGeoPosition: ['', [Validators.required]],

      passportNumber: ['', [Validators.required]],
      passportDate: ['', [Validators.required]],
      passportFrom: ['', [Validators.required]],
      passportCode: ['', [Validators.required]]
    })
  }

  onSubmit() {

  }
}
