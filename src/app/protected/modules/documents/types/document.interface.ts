import { DocumentSignatureInterface } from './document-signature.interface';
import { DocumentFlowInterface } from './document-flow.interface';
import { OrganizationReferenceInterface } from './../../../../shared/types/organization/organization-reference.interface';
import { FileModeInterface } from "src/app/shared/types/file/file-model.interface";

export interface DocumentInterface {
  Organization: OrganizationReferenceInterface;
  Counterparty: OrganizationReferenceInterface;
  Number: string;
  Date: Date;
  TypeName: string;
  TypeTitle: string;
  Title: string;
  User: string;
  Summ: number;
  File: FileModeInterface;
  Flows: DocumentFlowInterface[];
  Signatures: DocumentSignatureInterface[];
  Parties: OrganizationReferenceInterface[];
  ID: number;
}
