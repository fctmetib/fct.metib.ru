import { AddressInterface } from "../common/address.interface";
import { OrganizationRequisitesInterface } from "./organization-requisites.interface";

export interface OrganizationDataInterface {
  Type: number;
  LegalForm: string;

  ShortTitle: string;
  FullTitle: string;
  ForeignTitle: string;

  Phone: string;
  Email: string;
  Website: string;

  LegalAddress: AddressInterface;

  FactAddressEquals: boolean;
  FactAddress: AddressInterface;

  PostAddressEquals: boolean;
  PostAddress: AddressInterface;

  Requisites: OrganizationRequisitesInterface;
}
