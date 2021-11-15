import { DemandAddonAccountInterface } from "./demand-addon-account.interface";
import { DemandEDIInterface } from "./demand-edi.interface";
import { DemandObligationInterface } from "./demand-obligation.interface";
import { DemandPropertiesInterface } from "./demand-properties.interface";

export interface DemandFactoringInterface {
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
}
