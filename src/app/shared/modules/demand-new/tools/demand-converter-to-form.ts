import { formatDate } from '@angular/common';
import { PersonInterface } from 'src/app/shared/types/common/person.interface';
import { OrganizationDataInterface } from 'src/app/shared/types/organization/organization-data.interface';
import { PassportInterface } from 'src/app/shared/types/user/passport.interface';
import { DemandFactoringInterface } from '../types/demand-factoring.interface';
import { DemandEDSDataInterface } from '../types/demand-form-data/demand-eds-data.interface';

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
        displayAddress: this._convertToDisplayAddress(
          organization?.LegalAddress
        ),
        factoringPlacesAddress: organization?.LegalAddress,
      },
      organizationActualAddress: {
        displayAddress: this._convertToDisplayAddress(
          organization?.FactAddress
        ),
        factoringPlacesAddress: organization?.FactAddress,
      },
      organizationPostAddress: {
        displayAddress: this._convertToDisplayAddress(
          organization?.PostAddress
        ),
        factoringPlacesAddress: organization?.PostAddress,
      },
      //TODO: Update it
      ownerGeoPosition: null,
      ownerIdCenter: null,
    };
    return result;
  }

  public convertFactoringToFormData(dataFromAPI: any): DemandFactoringInterface {
    console.log('FROM API: ', dataFromAPI);
    return null;
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
