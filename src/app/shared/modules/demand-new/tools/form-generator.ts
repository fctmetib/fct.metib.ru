import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class FormGenerator {

  constructor(private fb: FormBuilder) {}

  public generateEDSForm(): FormGroup {
    const form = this.fb.group({
      organizationType: [1],
      organizationLegalForm: [''],
      organizationShortName: ['', [Validators.required]],
      organizationFullName: ['', [Validators.required]],
      organizationINN: ['', [Validators.required]],
      organizationKPP: ['', [Validators.required]],
      organizationOGRN: ['', [Validators.required]],
      organizationOKPO: ['', [Validators.required]],
      organizationPhone: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required]],
      organizationWEB: ['', [Validators.required]],

      // Юр. адресс
      organizationLegalAddress: this.generateAddressForm(),
      organizationIsActualAdressEqual: [false],

      // Факт. адресс
      organizationActualAddress: this.generateAddressForm(),
      organizationIsLegalAdressEqual: [false],

      // Почтовый. адресс
      organizationPostAddress: this.generateAddressForm(),

      ownerSurname: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerMiddlename: ['', [Validators.required]],
      ownerGender: [0, [Validators.required]],
      ownerSNILS: ['', [Validators.required]],
      ownerDateBurn: ['', [Validators.required]],
      ownerPlaceBurn: ['', [Validators.required]],
      ownerPhone: ['', [Validators.required]],
      ownerWorkPosition: [''],
      ownerEmail: ['', [Validators.required]],
      ownerGeoPosition: [''],
      ownerIdCenter: [''],

      passportNumber: ['', [Validators.required]],
      passportDate: ['', [Validators.required]],
      passportFrom: ['', [Validators.required]],
      passportCode: ['', [Validators.required]],
      passportNationality: [''],
    });

    return form;
  }


  public generateAddressForm(): FormGroup {
    const addressForm = this.fb.group({
      displayAddress: 'Российская Федерация, 77 Москва',
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
    });

    return addressForm;
  }
}
