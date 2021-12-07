import { DemandEDSDataInterface } from '../types/demand-form-data/demand-eds-data.interface';
import { OrganizationDataInterface } from 'src/app/shared/types/organization/organization-data.interface';
import { PersonInterface } from 'src/app/shared/types/common/person.interface';
import { PassportInterface } from 'src/app/shared/types/user/passport.interface';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { CreateDemandEDSRequestInterface } from '../types/requests/create-demand-eds-request.interface';

export class DemandConverterToAPI {
  public convertEDSToApiData(form: DemandEDSDataInterface, files: FileModeInterface[]) {
    let organization: OrganizationDataInterface = {
      Email: form.organizationEmail,
      FactAddress:
      form.organizationActualAddress.factoringPlacesAddress,
      FactAddressEquals: form.organizationIsActualAdressEqual,
      ForeignTitle: '',
      FullTitle: form.organizationFullName,
      LegalAddress:
      form.organizationLegalAddress.factoringPlacesAddress,
      LegalForm: form.organizationLegalForm,
      Phone: form.organizationPhone,
      PostAddress: form.organizationPostAddress.factoringPlacesAddress,
      PostAddressEquals: form.organizationIsLegalAdressEqual,
      Requisites: {
        INN: form.organizationINN,
        KPP: form.organizationKPP,
        OGRN: form.organizationOGRN,
        OKATO: '',
        OKPO: form.organizationOKPO,
      },
      ShortTitle: form.organizationShortName,
      Type: form.organizationType,
      Website: form.organizationWEB,
    };

    let passport: PassportInterface = {
      Date: form?.passportDate
        ? new Date(form.passportDate).toISOString().slice(0, 19) +
          '+03:00'
        : null,
      IsForeign: false,
      IssuerCode: form.passportCode,
      IssuerTitle: form.passportFrom,
      Nationality: form.passportNationality,
      Number: form.passportNumber,
    };

    let person: PersonInterface = {
      Name: {
        First: '',
        Last: '',
        Second: '',
      },

      NameFirst: form.ownerName,
      NameLast: form.ownerSurname,
      NameSecond: form.ownerMiddlename,
      Gender: form.ownerGender,

      SNILS: form.ownerSNILS,
      BirthDate: new Date(form.ownerDateBurn),
      BirthPlace: form.ownerPlaceBurn,

      Phone: form.ownerPhone,
      Email: form.ownerEmail,
      INN: form.ownerINN,
    };

    let data: CreateDemandEDSRequestInterface = {
      Files: files,
      Organization: organization,
      Passport: passport,
      Person: person,
      PersonPosition: form.ownerWorkPosition,
      Type: 'DigitalSignature',
    };
    return data;
  }

  public convertFactoringToApiData(form: any, file: FileModeInterface[]) {

  }
}
