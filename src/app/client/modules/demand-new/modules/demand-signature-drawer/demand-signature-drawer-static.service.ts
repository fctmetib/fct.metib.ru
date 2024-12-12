import { Injectable } from '@angular/core';

@Injectable()
export class DemandSignatureDrawerStaticService {
  public digitalSignatureType = 'DigitalSignature'
  private _payload: any
  public person: any
  public organization: any

  constructor(
  ) {
    this.payload = {
      Subject: null,
      Organization: {
        Type: null,
        LegalForm: null,
        FullTitle: null,
        ShortTitle: null,
        ForeignTitle: null,
        Phone: null,
        Email: null,
        Website: null,
        LegalAddress: {
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        },
        PostAddress: {
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        },
        FactAddressEquals: false,
        PostAddressEquals: true,
        FactAddress: {
          PostCode: null,
          Country: null,
          RegionTitle: null,
          RegionCode: null,
          District: null,
          City: null,
          Locality: null,
          Street: null,
          House: null,
          Appartment: null
        },
        Requisites: {
          LegalForm: null,
          INN: null,
          KPP: null,
          OGRN: null,
          OKPO: null,
          OKATO: null,
          OKVED: null,
          OKOGU: null,
          Signer: {
            FIO: null,
            Position: null,
            Reason: null,
            Person: null,
            Passport: null,
            RegistrationAddress: null
          },
          AccountManager: null,
          BankAccount: {
            Bank: null,
            COR: null,
            BIK: null,
            Number: null
          },
          RegistrationDate: null,
          SalesManagerID: null,
          RegistrationRegionID: null
        },
        Settings: {
          BorderHour: 16,
          AgregateUnload: true,
          FabricPostingType: 1,
          SystemNameType: 1
        }
      },
      Person: {
        NameFirst: null,
        NameLast: null,
        NameSecond: null,
        Gender: null,
        Phone: null,
        Email: null,
        SNILS: null,
        INN: null,
        BirthDate: null,
        BirthCountryCode: null,
        BirthPlace: null,
        Address: null
      },
      Passport: {
        Number: null,
        Date: null,
        Expire: null,
        IssuerTitle: null,
        IssuerCode: null,
        IsForeign: false,
        Nationality: null
      },
      PersonPosition: null,
      PersonalAgreement: true,
      identificationPointGuid: null,
      SkipIsDoneCheck: null,
      Type: this.digitalSignatureType,
      Files: null
    }
  }

  set payload(data: any) {
    this._payload = data
  }

  get payload() {
    return this._payload
  }
}
