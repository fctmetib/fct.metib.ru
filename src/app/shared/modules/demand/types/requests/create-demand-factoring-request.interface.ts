import { DemandObligationInterface } from './../common/demand-obligation.interface';
import { DemandEDIInterface } from './../common/demand-edi.interface';
import { DemandPropertiesInterface } from '../common/demand-properties.interface';
import { DemandDataBaseInterface } from '../demand-data-base.interface';
import { DemandAddonAccountInterface } from '../common/demand-addon-account.interface';

export interface CreateDemandFactoringRequestInterface
  extends DemandDataBaseInterface {
  Anket: {
    Activities: [];
    Licenses: [];
    Signer: {
      PositionDate: Date;
      PositionTitle: string;
      Person: {
        Name: {
          Last: string;
          First: string;
          Second: string;
        };
        NameFirst: string;
        NameLast: string;
        NameSecond: string;
        Gender: number;
        SNILS: string;
        BirthDate: Date;
        BirthPlace: string;
        Phone: string;
        Email: string;
      };
      Passport: {
        Number: string;
        Date: Date;
        Expire: Date;
        IssuerTitle: string;
        IssuerCode: string;
        IsForeign: boolean
        Nationality: string;
      };
      FactAddress: {
        PostCode: string;
        Country: string;
        RegionCode: number
        RegionTitle: string;
        City: string;
        District: string;
        Locality: string;
        Street: string;
        House: string;
        Appartment: string;
      };
      RegistrationAddress: {
        PostCode: string;
        Country: string;
        RegionCode: number;
        RegionTitle: string;
        City: string;
        District: string;
        Locality: string;
        Street: string;
        House: string;
        Appartment: string;
      };
    };
    Organization: {
      Type: number;
      LegalForm: string;
      ShortTitle: string;
      FullTitle: string;
      ForeignTitle: string;
      Phone: string;
      Email: string;
      Website: string;
      LegalAddress: {
        PostCode: string;
        Country: string;
        RegionCode: number;
        RegionTitle: string;
        City: string;
        District: string;
        Locality: string;
        Street: string;
        House: string;
        Appartment: string;
      };
      FactAddressEquals: boolean;
      FactAddress: {
        PostCode: string;
        Country: string;
        RegionCode: number;
        RegionTitle: string;
        City: string;
        District: string;
        Locality: string;
        Street: string;
        House: string;
        Appartment: string;
      };
      PostAddressEquals: boolean;
      PostAddress: {
        PostCode: string;
        Country: string;
        RegionCode: number;
        RegionTitle: string;
        City: string;
        District: string;
        Locality: string;
        Street: string;
        House: string;
        Appartment: string;
      };
      Requisites: {
        INN: string;
        KPP: string;
        OGRN: string;
        OKPO: string;
        OKATO: string;
      };
    };
    Resident: {
      IsResident: boolean;
      Country: string;
      ForeignCode: string;
    };
    Registration: {
      Date: Date;
      Number: string;
      Authority: string;
      Place: string;
      InitDate: Date
    };
    Capital: {
      Total: number;
      Payed: number;
    };
    Objectives: {
      FinancialObjective: number;
      FinancialObjectiveOther: string;
      BankRelationObjective: number;
      BankRelationObjectiveOther: string;
      TransactionsCount: string;
      TransactionsSumm: string;
      TransactionsContracts: string;
    };
    Shareholders: [];
  };
  Factoring: {
    Products: string;
    Trademarks: string;
    Suppliers: string;
    Buyers: string;
    StaffAmount: number;
    LimitWanted: number;
    EDI: DemandEDIInterface[];
    Properties: DemandPropertiesInterface[];
    Obligations: DemandObligationInterface[];
    AddonAccounts: DemandAddonAccountInterface[];
    FactoringAim: number;
    Account: {
      Number: string;
      BIK: string;
      COR: string;
      Bank: string;
      Date: Date;
      Expire: Date;
      Comment: string;
    };
  };
}
