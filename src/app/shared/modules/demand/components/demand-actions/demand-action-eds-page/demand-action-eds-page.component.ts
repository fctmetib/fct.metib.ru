import { FileModeInterface } from './../../../../../types/file/file-model.interface';
import { PersonInterface } from 'src/app/shared/types/common/person.interface';
import { PassportInterface } from './../../../../../types/user/passport.interface';
import { CreateDemandEDSRequestInterface } from './../../../types/requests/create-demand-eds-request.interface';
import { DemandService } from './../../../services/demand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { OrganizationInterface } from 'src/app/shared/types/organization/organization.interface';
import { OrganizationDataInterface } from 'src/app/shared/types/organization/organization-data.interface';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';

@Component({
  selector: 'app-demand-action-eds-page',
  templateUrl: './demand-action-eds-page.component.html',
  styleUrls: ['./demand-action-eds-page.component.scss'],
})
export class DemandActionEDSPageComponent implements OnInit {
  isUserVerified: boolean;
  formEDS: FormGroup;
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
  postionTypes: DemandSelectboxInterface[] = [
    { title: 'Директор', value: 'Директор' },
  ];
  genderTypes: DemandSelectboxInterface[] = [
    {
      title: 'Женский',
      value: 0,
    },
    {
      title: 'Мужской',
      value: 1,
    },
  ];
  locationTypes: DemandSelectboxInterface[] = [
    {
      title: 'Россия',
      value: 'Россия',
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
      ownerGender: [0, [Validators.required]],
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
      passportCode: ['', [Validators.required]],
    });
  }

  onUpload($event: Event, type: string) {}

  onSubmit() {
    console.log(this.formEDS.value);
    let organization: OrganizationDataInterface = {
      Email: '',
      FactAddress: this.formEDS.value.organizationActualAddress,
      FactAddressEquals: this.formEDS.value.organizationIsActualAdressEqual,
      ForeignTitle: '',
      FullTitle: '',
      LegalAddress: this.formEDS.value.organizationFullName,
      LegalForm: this.formEDS.value.organizationLegalForm,
      Phone: this.formEDS.value.organizationPhone,
      PostAddress: this.formEDS.value.organizationLegalAddress,
      PostAddressEquals: this.formEDS.value.organizationIsLegalAdressEqual,
      Requisites: {
        INN: this.formEDS.value.organizationINN,
        KPP: this.formEDS.value.organizationKPP,
        OGRN: this.formEDS.value.organizationOGRN,
        OKATO: '',
        OKPO: this.formEDS.value.organizationOKPO,
      },
      ShortTitle: this.formEDS.value.organizationShortName,
      Type: 1,
      Website: this.formEDS.value.organizationWEB,
    };

    let passport: PassportInterface = {
      Date: this.formEDS.value.passportDate,
      IsForeign: false,
      IssuerCode: this.formEDS.value.passportCode,
      IssuerTitle: this.formEDS.value.passportFrom,
      Nationality: 'RUS',
      Number: this.formEDS.value.passportNumber,
    };

    let person: PersonInterface = {
      Name: {
        First: '',
        Last: '',
        Second: '',
      },

      NameFirst: this.formEDS.value.ownerName,
      NameLast: this.formEDS.value.ownerSurname,
      NameSecond: this.formEDS.value.ownerMiddlename,
      Gender: this.formEDS.value.ownerGender,

      SNILS: this.formEDS.value.ownerSNILS,
      BirthDate: this.formEDS.value.valueownerDateBurn,
      BirthPlace: this.formEDS.value.ownerPlaceBurn,

      Phone: this.formEDS.value.ownerPhone,
      Email: this.formEDS.value.ownerEmail,
    };

    let data: SaveDemandRequestInterface<CreateDemandEDSRequestInterface> = {
      DraftID: 0,
      Data: {
        Files: this.files,
        Organization: organization,
        Passport: passport,
        Person: person,
        PersonPosition: this.formEDS.value.ownerWorkPosition,
        Type: 'DigitalSignature',
      },
    };
    this.demandService.add(data).subscribe((resp) => {});
  }
}
