import { OrganizationInterface } from "./organization.interface";

export interface OrganizationViewInterface {
  organizationInfo: OrganizationInterface;
  organizationStaffList: OrganizationStaffInterface[];
}

export interface OrganizationStaffInterface {
  Comment: string;
  Email: string;
  Gender: string;
  ID: number;
  NameFirst: string;
  NameLast: string;
  NameSecond: string;
  Phone: string;
  Post: string;
}
