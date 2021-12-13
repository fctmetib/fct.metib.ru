import { formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandEDIProvidersDataInterface } from '../types/demand-form-data/demand-factoring-data.interface';

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

      ownerSurname: [{ value: '', disabled: true }, [Validators.required]],
      ownerName: [{ value: '', disabled: true }, [Validators.required]],
      ownerMiddlename: ['', [Validators.required]],
      ownerGender: [{ value: 0, disabled: true }, [Validators.required]],
      ownerSNILS: ['', [Validators.required]],
      ownerDateBurn: ['', [Validators.required]],
      ownerPlaceBurn: ['', [Validators.required]],
      ownerPhone: [{ value: '', disabled: true }, [Validators.required]],
      ownerWorkPosition: [''],
      ownerEmail: [{ value: '', disabled: true }, [Validators.required]],
      ownerINN: ['', [Validators.required]],
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

  public generateFactoringForm(): FormGroup {
    const form = this.fb.group({
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

      factoringProducts: ['', [Validators.required]],
      factoringTradeMarks: ['', [Validators.required]],
      factoringShipments: ['', [Validators.required]],
      factoringFinanceLimit: [null, [Validators.required]],
      factoringClients: ['', [Validators.required]],
      factoringWorkers: [0, [Validators.required]],

      otherBanks: this.fb.array([]),
      factoringPlaces: this.fb.array([]),
      factoringCredits: this.fb.array([]),
      factoringEDIProviders: this.fb.array([]),
    });

    return form;
  }

  public generateEDIFormGroup(): FormGroup {
    return this.fb.group({
      factoringEDIProvidersDebitor: ['', [Validators.required]],
      factoringEDIProvidersProvider: ['', [Validators.required]],
    });
  }

  public generateAgentFactoringForm(): FormGroup {
    return this.fb.group({});
  }

  public generateAddressForm(): FormGroup {
    const addressForm = this.fb.group({
      displayAddress: [
        { value: 'Российская Федерация, 77 Москва', disabled: true },
      ],
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

  public generateFactorCreditGroup(creditForm?): FormGroup {
    return this.fb.group({
      factoringCreditsCreditor: [
        creditForm ? creditForm.factoringCreditsCreditor : '',
      ],
      factoringPlacesTypeDuty: [
        creditForm ? creditForm.factoringPlacesTypeDuty : '',
      ],
      factoringPlacesDateClose: [
        creditForm?.factoringPlacesDateClose
          ? formatDate(creditForm?.factoringPlacesDateClose, 'yyyy-MM-dd', 'en')
          : '',
      ],
      factoringPlacesContractSum: [
        creditForm ? creditForm.factoringPlacesContractSum : '',
      ],
      factoringPlacesBalanceReport: [
        creditForm ? creditForm.factoringPlacesBalanceReport : '',
      ],
      factoringPlacesBalanceCurrent: [
        creditForm ? creditForm.factoringPlacesBalanceCurrent : '',
      ],
    });
  }

  public generateEDIFormArray(
    ediProvider?: DemandEDIProvidersDataInterface
  ): FormGroup {
    return this.fb.group({
      factoringEDIProvidersDebitor: [
        ediProvider ? ediProvider.factoringEDIProvidersDebitor : '',
        [Validators.required],
      ],
      factoringEDIProvidersProvider: [
        ediProvider ? ediProvider.factoringEDIProvidersProvider : '',
        [Validators.required],
      ],
    });
  }

  public generateFactoringPlaceForm(factoringPlace?): FormGroup {
    return this.fb.group({
      displayAddress: [{ value: '', disabled: true }],
      factoringPlacesAddress: {
        PostCode: factoringPlace
          ? factoringPlace?.factoringPlacesAddress?.PostCode
          : '',
        Country: factoringPlace
          ? factoringPlace?.Address?.Country
          : 'Российская Федерация',
        RegionCode: factoringPlace
          ? factoringPlace?.factoringPlacesAddress?.RegionCode
          : 77,
        RegionTitle: factoringPlace
          ? factoringPlace?.factoringPlacesAddress?.RegionTitle
          : '',
        City: factoringPlace
          ? factoringPlace?.factoringPlacesAddress?.City
          : 'Москва',
        District: factoringPlace
          ? factoringPlace?.factoringPlacesAddress?.District
          : '',
        Locality: factoringPlace
          ? factoringPlace?.factoringPlacesAddress?.Locality
          : '',
        Street: factoringPlace
          ? factoringPlace?.factoringPlacesAddress?.Street
          : '',
        House: factoringPlace
          ? factoringPlace?.factoringPlacesAddress?.House
          : '',
        Appartment: factoringPlace
          ? factoringPlace?.factoringPlacesAddress?.Appartment
          : '',
      },
      factoringPlacesLegalForm: [
        factoringPlace?.factoringPlacesLegalForm
          ? factoringPlace?.factoringPlacesLegalForm
          : '',
        [Validators.required],
      ],
    });
  }

  public generateBankForm(bank?): FormGroup {
    return this.fb.group({
      otherBankAccountOpenDate: [
        bank?.otherBankAccountOpenDate
          ? formatDate(bank?.otherBankAccountOpenDate, 'yyyy-MM-dd', 'en')
          : '',
        [Validators.required],
      ],
      otherBankAccountCloseDate: [
        bank?.otherBankAccountCloseDate
          ? formatDate(bank?.otherBankAccountCloseDate, 'yyyy-MM-dd', 'en')
          : '',
      ],
      otherBankName: [
        bank?.otherBankName ? bank?.otherBankName : '',
        [Validators.required],
      ],
      otherBankOwnerAccount: [
        bank?.otherBankOwnerAccount ? bank?.otherBankOwnerAccount : '',
        [Validators.required],
      ],
      otherBankTarget: [
        bank?.otherBankTarget ? bank?.otherBankTarget : '',
        [Validators.required],
      ],
    });
  }
}
