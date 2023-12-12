import { FileModeInterface } from "src/app/shared/types/file/file-model.interface";
import { DemandAction } from "../common/demand-action";

export interface DemandAPIInterface {
  Organization: {
    Type: number;
    LegalForm: string;
    FullTitle: string;
    ShortTitle: string;
    ForeignTitle: string;
    Phone: string;
    Email:string;
    Website: string;
    LegalAddress: {
      PostCode: string;
      RegionTitle: string;
      RegionCode: number;
      Street: string;
      House: string;
      Appartment: string;
    };
    FactAddressEquals: boolean;
    FactAddress: {
      PostCode: string;
      Country:string;
      RegionTitle:string;
      RegionCode: number;
      District: string;
      City: string;
      Locality: string;
      Street: string;
      House: string;
      Appartment: string;
    };
    PostAddressEquals: boolean;
    PostAddress: {
      PostCode: string;
      Country: string;
      RegionTitle: string;
      RegionCode: number;
      District: string;
      City: string;
      Locality: string;
      Street: string;
      House: string;
      Appartment:string;
    };
    Requisites: {
      LegalForm: string;
      INN: string;
      KPP: string;
      OGRN: string;
      OKPO: string;
      OKATO: string;
      OKVED: string;
      Signer: {
        FIO: string;
        Position: string;
        Reason: string;
      };
      AccountManager: string;
      BankAccount: {
        Bank:string;
        COR: string;
        BIK: string;
        Number: string;
      };
      RegistrationDate: string;
      RegistrationRegionID: number;
      SalesManagerID: number;
    };
    Settings: {
      BorderHour: number;
      AgregateUnload: boolean;
      FabricPostingType: number;
      SystemNameType: number;
    };
  };
  Person: {
    NameFirst: string;
    NameLast: string;
    NameSecond: string;
    Gender: number;
    SNILS: string;
    INN: string;
    BirthDate: string;
    BirthCountryCode: string;
    BirthPlace: string;
    Phone: string;
    Email: string;
  };
  Passport: {
    Number: string;
    Date: string;
    IssuerTitle: string;
    IssuerCode: string;
    IsForeign: boolean;
    Nationality: string;
  };
  PersonPosition: string;
  PersonalAgreement: boolean;
  identificationPointGuid: string;
  Type: DemandAction;
  Files: FileModeInterface[];
}
