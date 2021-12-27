import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonInterface } from 'src/app/shared/types/common/person.interface';
import { OrganizationDataInterface } from 'src/app/shared/types/organization/organization-data.interface';
import { PassportInterface } from 'src/app/shared/types/user/passport.interface';
import { DemandAddonAccountInterface } from '../types/demand-addon-account.interface';
import { DemandAnketInterface } from '../types/demand-anket.interface';
import { DemandEDIInterface } from '../types/demand-edi.interface';
import { DemandFactoringInterface } from '../types/demand-factoring.interface';
import { DemandEDSDataInterface } from '../types/demand-form-data/demand-eds-data.interface';
import { DemandFactoringDataInterface } from '../types/demand-form-data/demand-factoring-data.interface';
import { DemandObligationInterface } from '../types/demand-obligation.interface';
import { DemandPropertiesInterface } from '../types/demand-properties.interface';

export class DemandConverterToForm {
  public convertEDSToFormData(dataFromAPI: any): DemandEDSDataInterface {
    const organization: OrganizationDataInterface = dataFromAPI?.Organization;
    const passport: PassportInterface = dataFromAPI?.Passport;
    const person: PersonInterface = dataFromAPI?.Person;

    const result: DemandEDSDataInterface = {
      organizationType: organization?.Type ? organization?.Type : 0,
      organizationLegalForm: organization?.LegalForm
        ? organization?.LegalForm
        : '',
      organizationShortName: organization?.ShortTitle
        ? organization?.ShortTitle
        : '',
      organizationFullName: organization?.FullTitle
        ? organization?.FullTitle
        : '',
      organizationINN: organization?.Requisites?.INN
        ? organization?.Requisites?.INN
        : '',
      organizationKPP: organization?.Requisites?.KPP
        ? organization?.Requisites?.KPP
        : '',
      organizationOGRN: organization?.Requisites?.OGRN
        ? organization?.Requisites?.OGRN
        : '',
      organizationOKPO: organization?.Requisites?.OKPO
        ? organization?.Requisites?.OKPO
        : '',
      organizationPhone: organization?.Phone ? organization?.Phone : '',
      organizationEmail: organization?.Email ? organization?.Email : '',
      organizationWEB: organization?.Website ? organization?.Website : '',

      organizationIsActualAdressEqual: organization?.FactAddressEquals
        ? organization?.FactAddressEquals
        : false,

      organizationIsLegalAdressEqual: organization?.PostAddressEquals
        ? organization?.PostAddressEquals
        : false,

      ownerSurname: person?.NameLast ? person?.NameLast : '',
      ownerName: person?.NameFirst ? person?.NameFirst : '',
      ownerMiddlename: person?.NameSecond ? person?.NameSecond : '',
      ownerGender: person?.Gender ? person?.Gender : 0,
      ownerSNILS: person?.SNILS ? person?.SNILS : '',
      ownerINN: person?.INN ? person?.INN : '',
      ownerDateBurn: person?.BirthDate
        ? formatDate(person?.BirthDate, 'yyyy-MM-dd', 'en')
        : '',
      ownerPlaceBurn: person?.BirthPlace ? person?.BirthPlace : '',
      ownerPhone: person?.Phone ? person?.Phone : '',
      ownerWorkPosition: dataFromAPI?.PersonPosition
        ? dataFromAPI?.PersonPosition
        : '',
      ownerEmail: person?.Email ? person?.Email : '',

      passportNumber: passport?.Number ? passport?.Number : '',
      passportDate: passport?.Date
        ? formatDate(passport.Date, 'yyyy-MM-dd', 'en')
        : '',
      passportFrom: passport?.IssuerTitle ? passport?.IssuerTitle : '',
      passportCode: passport?.IssuerCode ? passport?.IssuerCode : '',
      passportNationality: passport?.Nationality ? passport.Nationality : '',
      // Заполнение адресов
      organizationLegalAddress: {
        displayAddress: organization?.LegalAddress
          ? this._convertToDisplayAddress(organization?.LegalAddress)
          : '',
        factoringPlacesAddress: organization?.LegalAddress,
      },
      organizationActualAddress: {
        displayAddress: organization?.FactAddress
          ? this._convertToDisplayAddress(organization?.FactAddress)
          : '',
        factoringPlacesAddress: organization?.FactAddress,
      },
      organizationPostAddress: {
        displayAddress: organization?.PostAddress
          ? this._convertToDisplayAddress(organization?.PostAddress)
          : '',
        factoringPlacesAddress: organization?.PostAddress,
      },
      //TODO: Update it
      ownerGeoPosition: null,
      ownerIdCenter: null,
    };
    return result;
  }

  public convertVerifyToFormData(dataFromAPI: any): any {
    let DocumentTypeTorg12 = false;
    let DocumentTypeInvoice = false;
    let DocumentTypeAcceptance = false;
    let DocumentTypeNonformalized = false;
    let DocumentTypeORDER = false;
    let DocumentTypeRECADV = false;

    dataFromAPI.DocumentTypes.forEach((documentType) => {
      if (documentType === 'Torg12') {
        DocumentTypeTorg12 = true;
      }
      if (documentType === 'Invoice') {
        DocumentTypeInvoice = true;
      }
      if (documentType === 'Acceptance') {
        DocumentTypeAcceptance = true;
      }
      if (documentType === 'Nonformalized') {
        DocumentTypeNonformalized = true;
      }
      if (documentType === 'ORDER') {
        DocumentTypeORDER = true;
      }
      if (documentType === 'RECADV') {
        DocumentTypeRECADV = true;
      }
    });

    let result = {
      Comment: dataFromAPI?.Comment ? dataFromAPI?.Comment : '',
      DebtorID: dataFromAPI?.DebtorID ? dataFromAPI?.DebtorID : '',
      GLN: dataFromAPI?.GLN ? dataFromAPI?.GLN : '',
      VerificationType: dataFromAPI?.VerificationType
        ? dataFromAPI?.VerificationType
        : 'EDIKorus',
      DocumentTypeTorg12: DocumentTypeTorg12,
      DocumentTypeInvoice: DocumentTypeInvoice,
      DocumentTypeAcceptance: DocumentTypeAcceptance,
      DocumentTypeNonformalized: DocumentTypeNonformalized,
      DocumentTypeORDER: DocumentTypeORDER,
      DocumentTypeRECADV: DocumentTypeRECADV,
    };

    return result;
  }

  public convertDebitorToFormData(dataFromAPI: any): any {
    let result: any = {
      INN: dataFromAPI.INN,
    };

    if (dataFromAPI.IsNew) {
      result.Id = dataFromAPI.Title;
    } else {
      result.Id = dataFromAPI.ID;
    }

    return result;
  }

  public convertLimitToFormData(dataFromAPI: any): any {
    let result = {
      limit: dataFromAPI.Limit,
      comment: dataFromAPI.Comment,
    };

    return result;
  }

  public convertFreeToFormData(dataFromAPI: any): any {
    let result = {
      subject: dataFromAPI?.Subject,
      question: dataFromAPI?.Question,
    };

    return result;
  }

  public convertProfileToFormData(dataFromAPI: any): any {
    let result = {
      last: dataFromAPI?.Profile?.Name?.Last
        ? dataFromAPI?.Profile?.Name?.Last
        : '',
      first: dataFromAPI?.Profile?.Name?.First
        ? dataFromAPI?.Profile?.Name?.First
        : '',
      isMale: dataFromAPI?.Profile?.IsMale ? dataFromAPI?.Profile?.IsMale : '',
      phone: dataFromAPI?.Profile?.Phone ? dataFromAPI?.Profile?.Phone : '',
      email: dataFromAPI?.Profile?.Email ? dataFromAPI?.Profile?.Email : '',
      number: dataFromAPI?.Passport?.Number
        ? dataFromAPI?.Passport?.Number
        : '',
      date: dataFromAPI?.Passport?.Date
        ? formatDate(dataFromAPI?.Passport?.Date, 'yyyy-MM-dd', 'en')
        : '',
      issuerTitle: dataFromAPI?.Passport?.IssuerTitle
        ? dataFromAPI.Passport?.IssuerTitle
        : '',
      issuerCode: dataFromAPI?.Passport?.IssuerCode
        ? dataFromAPI?.Passport?.IssuerCode
        : '',
    };

    return result;
  }

  public convertSuretyToFormData(dataFromAPI: any): any {
    let factoring: DemandFactoringInterface = dataFromAPI.Factoring;
    let anket: DemandAnketInterface = dataFromAPI.Anket;

    let banks: DemandAddonAccountInterface[] = factoring.AddonAccounts;
    let places: DemandPropertiesInterface[] = factoring.Properties;
    let credits: DemandObligationInterface[] = factoring.Obligations;
    let ediProviders: DemandEDIInterface[] = factoring.EDI;

    let result = {
      organizationType: anket.Organization.Type,
      organizationLegalForm: anket.Organization.LegalForm,
      organizationShortName: anket.Organization.ShortTitle,
      organizationINN: anket.Organization.Requisites.INN,
      organizationPhone: anket.Organization.Phone,
      organizationEmail: anket.Organization.Email,
      organizationWEB: anket.Organization.Website,

      bankBik: factoring.Account.BIK,
      bankCorrespondentAccount: factoring.Account.COR,
      bankName: factoring.Account.Bank,
      bankAccountOpenDate: formatDate(
        factoring.Account.Date,
        'yyyy-MM-dd',
        'en'
      ),
      bankOwnerAccount: factoring.Account.Number,
      bankComment: factoring.Account.Comment,

      factoringProducts: factoring.Products,
      factoringTradeMarks: factoring.Trademarks,
      factoringShipments: factoring.Suppliers,
      factoringFinanceLimit: factoring.LimitWanted,
      factoringClients: factoring.Buyers,
      factoringWorkers: factoring.StaffAmount,

      otherBanks: [],
      factoringPlaces: [],
      factoringCredits: [],
      factoringEDIProviders: [],
    };

    if (banks) {
      banks.forEach((b) =>
        result.otherBanks.push({
          otherBankAccountOpenDate: b?.Date
            ? formatDate(b?.Date, 'yyyy-MM-dd', 'en')
            : '',
          otherBankAccountCloseDate: b?.Expire
            ? formatDate(b?.Expire, 'yyyy-MM-dd', 'en')
            : '',
          otherBankName: b?.Bank ? b?.Bank : '',
          otherBankOwnerAccount: b?.Number ? b?.Number : '',
          otherBankTarget: b?.Comment ? b?.Comment : '',
        })
      );
    }
    if (places) {
      places.forEach((p) =>
        result.factoringPlaces.push({
          displayAddress: '',
          factoringPlacesAddress: {
            PostCode: p ? p?.Address?.PostCode : '',
            Country: p ? p?.Address?.Country : 'Российская Федерация',
            RegionCode: p ? p?.Address?.RegionCode : 77,
            RegionTitle: p ? p?.Address?.RegionTitle : '',
            City: p ? p?.Address?.City : 'Москва',
            District: p ? p?.Address?.District : '',
            Locality: p ? p?.Address?.Locality : '',
            Street: p ? p?.Address?.Street : '',
            House: p ? p?.Address?.House : '',
            Appartment: p ? p?.Address?.Appartment : '',
          },
          factoringPlacesLegalForm: 'Own',
        })
      );
    }
    if (credits) {
      credits.forEach((c) =>
        result.factoringCredits.push({
          factoringCreditsCreditor: c ? c.Creditor : '',
          factoringPlacesTypeDuty: c ? c.Type : '',
          factoringPlacesDateClose: c
            ? formatDate(c.Date, 'yyyy-MM-dd', 'en')
            : '',
          factoringPlacesContractSum: c ? c.Summ : '',
          factoringPlacesBalanceReport: c ? c.ReportingRest : '',
          factoringPlacesBalanceCurrent: c ? c.CurrentRest : '',
        })
      );
    }
    if (ediProviders) {
      ediProviders.forEach((e) => {
        result.factoringEDIProviders.push({
          factoringEDIProvidersDebitor: e?.Company ? e?.Company : '',
          factoringEDIProvidersProvider: e?.EDIProvider ? e?.EDIProvider : '',
        });
      });
    }

    return result;
  }

  public convertAgentFactoringToFormData(dataFromAPI: any): any {
    let factoring: DemandFactoringInterface = dataFromAPI?.Factoring;
    let anket: DemandAnketInterface = dataFromAPI?.Anket;

    let banks: DemandAddonAccountInterface[] = factoring?.AddonAccounts;
    let places: DemandPropertiesInterface[] = factoring?.Properties;
    let credits: DemandObligationInterface[] = factoring?.Obligations;

    let result = {
      organizationType: anket?.Organization?.Type,
      organizationLegalForm: anket?.Organization?.LegalForm,
      organizationShortName: anket?.Organization?.ShortTitle,
      organizationINN: anket?.Organization?.Requisites?.INN,
      organizationPhone: anket?.Organization?.Phone,
      organizationEmail: anket?.Organization?.Email,
      organizationWEB: anket?.Organization?.Website,

      bankBik: factoring?.Account?.BIK,
      bankCorrespondentAccount: factoring?.Account?.COR,
      bankName: factoring?.Account?.Bank,
      bankAccountOpenDate: formatDate(
        factoring?.Account?.Date ? factoring?.Account?.Date : null,
        'yyyy-MM-dd',
        'en'
      ),
      bankOwnerAccount: factoring?.Account?.Number,
      bankComment: factoring?.Account?.Comment,

      factoringProducts: factoring?.Products,
      factoringTradeMarks: factoring?.Trademarks,
      factoringShipments: factoring?.Suppliers,
      factoringFinanceLimit: factoring?.LimitWanted,
      factoringClients: factoring?.Buyers,
      factoringWorkers: factoring?.StaffAmount,

      factoringSuppliers: factoring?.Suppliers,
      factoringLimit: factoring?.LimitWanted,

      factoringCredits: [],
      factoringPlaces: [],
      otherBanks: [],
    };

    if (banks) {
      banks.forEach((b) =>
        result.otherBanks.push({
          otherBankAccountOpenDate: b ? b?.Date : '',
          otherBankAccountCloseDate: b?.Expire
            ? formatDate(b?.Expire, 'yyyy-MM-dd', 'en')
            : '',
          otherBankName: b ? b?.Bank : '',
          otherBankOwnerAccount: b ? b?.Number : '',
          otherBankTarget: b ? b?.Comment : '',
        })
      );
    }

    if (places) {
      places.forEach((p) =>
        result.factoringPlaces.push({
          displayAddress: '',
          factoringPlacesAddress: {
            PostCode: p ? p?.Address?.PostCode : '',
            Country: p ? p?.Address?.Country : 'Российская Федерация',
            RegionCode: p ? p?.Address?.RegionCode : 77,
            RegionTitle: p ? p?.Address?.RegionTitle : '',
            City: p ? p?.Address?.City : 'Москва',
            District: p ? p?.Address?.District : '',
            Locality: p ? p?.Address?.Locality : '',
            Street: p ? p?.Address?.Street : '',
            House: p ? p?.Address?.House : '',
            Appartment: p ? p?.Address?.Appartment : '',
          },
          factoringPlacesLegalForm: p ? p?.Type : '',
        })
      );
    }

    if (credits) {
      credits.forEach((c) =>
        result.factoringCredits.push({
          factoringCreditsCreditor: c ? c?.Creditor : '',
          factoringPlacesTypeDuty: c ? c?.Type : '',
          factoringPlacesDateClose: c?.Date
            ? formatDate(c?.Date, 'yyyy-MM-dd', 'en')
            : '',
          factoringPlacesContractSum: c ? c?.Summ : '',
          factoringPlacesBalanceReport: c ? c?.ReportingRest : '',
          factoringPlacesBalanceCurrent: c ? c?.CurrentRest : '',
        })
      );
    }

    return result;
  }

  public convertFactoringToFormData(
    dataFromAPI: any
  ): DemandFactoringDataInterface {
    let factoring: DemandFactoringInterface = dataFromAPI.Factoring;
    let anket: DemandAnketInterface = dataFromAPI.Anket;

    let banks: DemandAddonAccountInterface[] = factoring.AddonAccounts;
    let places: DemandPropertiesInterface[] = factoring.Properties;
    let credits: DemandObligationInterface[] = factoring.Obligations;
    let ediProviders: DemandEDIInterface[] = factoring.EDI;

    const result: DemandFactoringDataInterface = {
      organizationType: anket?.Organization?.Type,
      organizationLegalForm: anket?.Organization?.LegalForm,
      organizationShortName: anket?.Organization?.ShortTitle,
      organizationINN: anket?.Organization?.Requisites?.INN,
      organizationPhone: anket?.Organization?.Phone,
      organizationEmail: anket?.Organization?.Email,
      organizationWEB: anket?.Organization?.Website,

      bankBik: factoring?.Account?.BIK,
      bankCorrespondentAccount: factoring?.Account?.COR,
      bankName: factoring?.Account?.Bank,

      bankAccountOpenDate: formatDate(
        factoring?.Account?.Date ? factoring?.Account?.Date : null,
        'yyyy-MM-dd',
        'en'
      ),
      bankOwnerAccount: factoring?.Account?.Number,
      bankComment: factoring?.Account?.Comment,

      factoringProducts: factoring?.Products,
      factoringTradeMarks: factoring?.Trademarks,
      factoringShipments: factoring?.Suppliers,
      factoringFinanceLimit: factoring?.LimitWanted,
      factoringClients: factoring?.Buyers,
      factoringWorkers: factoring?.StaffAmount,

      factoringEDIProviders: [],
      factoringCredits: [],
      factoringPlaces: [],
      otherBanks: [],
    };

    banks.forEach((b) => {
      result.otherBanks.push({
        otherBankAccountOpenDate: b?.Date
          ? formatDate(b?.Date, 'yyyy-MM-dd', 'en')
          : '',
        otherBankAccountCloseDate: b?.Expire
          ? formatDate(b?.Expire, 'yyyy-MM-dd', 'en')
          : '',
        otherBankName: b?.Bank ? b?.Bank : '',
        otherBankOwnerAccount: b?.Number ? b?.Number : '',
        otherBankTarget: b?.Comment ? b?.Comment : '',
      });
    });

    places.forEach((p) => {
      result.factoringPlaces.push({
        displayAddress: this._convertToDisplayAddress(p),
        factoringPlacesAddress: {
          PostCode: p ? p.Address?.PostCode : '',
          Country: p ? p.Address?.Country : 'Российская Федерация',
          RegionCode: p ? p.Address?.RegionCode : 77,
          RegionTitle: p ? p.Address?.RegionTitle : '',
          City: p ? p?.Address?.City : 'Москва',
          District: p ? p?.Address?.District : '',
          Locality: p ? p?.Address?.Locality : '',
          Street: p ? p?.Address?.Street : '',
          House: p ? p?.Address?.House : '',
          Appartment: p ? p?.Address?.Appartment : '',
        },
        factoringPlacesLegalForm: p?.Type ? p?.Type : '',
      });
    });

    credits.forEach((c) => {
      result.factoringCredits.push({
        factoringCreditsCreditor: c ? c?.Creditor : '',
        factoringPlacesTypeDuty: c ? c?.Type : '',
        factoringPlacesDateClose: c?.Date
          ? formatDate(c?.Date, 'yyyy-MM-dd', 'en')
          : '',
        factoringPlacesContractSum: c ? c?.Summ : 0,
        factoringPlacesBalanceReport: c ? c?.ReportingRest : 0,
        factoringPlacesBalanceCurrent: c ? c?.CurrentRest : 0,
      });
    });

    ediProviders.forEach((e) => {
      result.factoringEDIProviders.push({
        factoringEDIProvidersDebitor: e?.Company ? e?.Company : '',
        factoringEDIProvidersProvider: e?.EDIProvider ? e?.EDIProvider : '',
      });
    });

    return result;
  }

  private _convertToDisplayAddress(address): string {
    let result = '';

    if (address?.PostCode) {
      result = result + ' ' + address.PostCode;
    }
    if (address?.Country) {
      result = result + ' ' + address.Country;
    }
    if (address?.RegionCode) {
      result = result + ' ' + address.RegionCode;
    }
    if (address?.RegionTitle) {
      result = result + ' ' + address.RegionTitle;
    }
    if (address?.City) {
      result = result + ' ' + address.City;
    }
    if (address?.District) {
      result = result + ' ' + address.District;
    }
    if (address?.Locality) {
      result = result + ' ' + address.Locality;
    }
    if (address?.Street) {
      result = result + ' ' + address.Street;
    }
    if (address?.House) {
      result = result + ' ' + address.House;
    }
    if (address?.Appartment) {
      result = result + ' ' + address.Appartment;
    }

    return result;
  }
}
