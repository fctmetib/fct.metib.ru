import { formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandEDIProvidersDataInterface } from '../types/demand-form-data/demand-factoring-data.interface';

export class FormGenerator {
  constructor(private fb: FormBuilder) {}

  public generateDebitorForm(): FormGroup {
    return this.fb.group({
      Id: ['', [Validators.required]],
      INN: [''],
    });
  }

  public generateVerifyForm(): FormGroup {
    return this.fb.group({
      Comment: ['', [Validators.required]],
      DebtorID: ['', [Validators.required]],
      GLN: [''],
      VerificationType: [''],
      DocumentTypeTorg12: false,
      DocumentTypeInvoice: false,
      DocumentTypeAcceptance: false,
      DocumentTypeNonformalized: false,
      // EDI only
      DocumentTypeORDER: false,
      DocumentTypeRECADV: false,
    });
  }

  public generateLimitForm(): FormGroup {
    return this.fb.group({
      limit: [0, [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

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

  public generateFreeForm(): FormGroup {
    return this.fb.group({
      subject: ['', [Validators.required]],
      question: ['', [Validators.required]],
    });
  }

  public generateProfileForm(): FormGroup {
    return this.fb.group({
      last: ['', [Validators.required]],
      first: ['', [Validators.required]],
      isMale: [false, [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      number: ['', [Validators.required]],
      date: ['', [Validators.required]],
      issuerTitle: ['', [Validators.required]],
      issuerCode: ['', [Validators.required]],
    });
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
      bankINN: ['', [Validators.required]],
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


  public generateAgentFactoringForm(): FormGroup {
    return this.fb.group({
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
      bankINN: ['', [Validators.required]],
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
      factoringSuppliers: ['', [Validators.required]],
      factoringLimit: [0, [Validators.required]],
    });
  }

  public generateEDIFormGroup(): FormGroup {
    return this.fb.group({
      factoringEDIProvidersDebitor: ['', [Validators.required]],
      factoringEDIProvidersProvider: ['', [Validators.required]],
    });
  }

  public generateSureryForm(): FormGroup {
    return this.fb.group({
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
      factoringFinanceLimit: [null, [Validators.required]],
      factoringClients: ['', [Validators.required]],
      factoringWorkers: [0, [Validators.required]],

      factoringPlaces: this.fb.array([]),

      factoringCredits: this.fb.array([]),

      factoringEDIProviders: this.fb.array([]),
    });
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

  public generateFactoringPlaceForm(data?): FormGroup {
    return this.fb.group({
      autocompleteInputAddress: [data?.displayAddress],
      displayAddress: [data?.displayAddress],
      factoringPlacesAddress: {
        PostCode: data
          ? data?.factoringPlacesAddress?.PostCode
          : '',
        Country: data
          ? data?.Address?.Country
          : 'Российская Федерация',
        RegionCode: data
          ? data?.factoringPlacesAddress?.RegionCode
          : 77,
        RegionTitle: data
          ? data?.factoringPlacesAddress?.RegionTitle
          : '',
        City: data
          ? data?.factoringPlacesAddress?.City
          : 'Москва',
        District: data
          ? data?.factoringPlacesAddress?.District
          : '',
        Locality: data
          ? data?.factoringPlacesAddress?.Locality
          : '',
        Street: data
          ? data?.factoringPlacesAddress?.Street
          : '',
        House: data
          ? data?.factoringPlacesAddress?.House
          : '',
        Appartment: data
          ? data?.factoringPlacesAddress?.Appartment
          : '',
      },
      factoringPlacesLegalForm: [
        data?.factoringPlacesLegalForm
          ? data?.factoringPlacesLegalForm
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
