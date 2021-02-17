import { AccountModelInterface } from "../account/account-model.interface";
import { SignerInfoModelInterface } from "../signer/signer-info-model.interface";

export interface OrganizationInterface {
  ABSID: number;
  CustomerID: number;
  DebtorID: number;
  Title: string;
  Telephone: string;
  Email: string;
  WebSite: string;
  Description: string;
  State: string;
  INN: string;
  KPP: string;
  OGRN: string;
  OKPO: string;
  OKATO: string;
  LegalForm: string;
  OKVED: string;
  Signer: SignerInfoModelInterface;
  Accountant: string;
  Account: AccountModelInterface;
  RegDate: Date;
  RegRegion: string;
  ID: number;
}
