import { ManagerReferenceInterface } from './../manager/manager-reference.interface';
import { ContractModelInterface } from './../contract/contract-model.interface';
import { OrganizationReferenceInterface } from './../organization/organization-reference.interface';

export interface Customer {
  ABSID: number;
  Title: string;
  Limit: number;
  Contract: ContractModelInterface;
  Organization: OrganizationReferenceInterface;
  Manager: ManagerReferenceInterface;
  ID: number;
}
