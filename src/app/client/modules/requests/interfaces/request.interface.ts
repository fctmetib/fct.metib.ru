import {FileMode} from '../../../../shared/types/file/file-model.interface'
import {
  DeliveryAgreement,
  Shipment
} from '../modules/shipment-drawer/interfaces/shipment.interface'

export enum RequestStatusEnum {}

export enum RequestTypeEnum {
  NON_FINANCING = 'NonFinancing',
  FINANCING = 'Financing',
  CORRECTION = 'Correction'
}

export enum DocumentType {
  CUSTOMER_REQUEST_SCAN = 'customerrequestscan',
  DOCUMENT = 'Document'
}

export interface RequestReq {
  Number: string
  Date: string
  Delivery: DeliveryAgreement
  Type: RequestTypeEnum
  Status: RequestStatusEnum
  Summ: number
  ReadOnly: boolean
  IsCorrected: boolean
  Shipments: Shipment[]
  Documents: DocumentRes[]
  Files: FileMode[]
}

export interface RequestRes extends RequestReq {
  ID: number
}

export interface DocumentSign {
  Serial: string;
  Title: string;
  Organization: string;
  Date: string;
  References: Reference[];
  Issuer: string;
  NotBefore: string;
  NotAfter: string;
}

export interface Reference {
  DocumentTypeID: number;
  ReferenceTypeID: number;
}


export interface DocumentReq {
  Number?: string
  Title: string
  Description?: string
  DocumentTypeID: number
  OwnerTypeID: number
  Data: string
}

export interface DocumentRes extends Omit<DocumentReq, 'Data'> {
  Location: string
  DocumentStatusID: number
  DocumentStatus: string
  DocumentType: string
  DocumentTypeTitle: string
  Available: boolean
  Removed?: boolean
  ActiveOrganizationID: number
  ActiveOrganization: string
  CreatedTime: string
  AuthorOrganizationID: number
  AuthorOrganization: string
  CreatorLastName: string
  CreatorFirstName: string
  DocumentID: number
  OwnerID: number
}

export interface RequestState {
  StateID: number;
  Identifier: string;
  Title: string;
  PublicTitle: string;
  OwnerID: number;
  OwnerTypeID: number;
  OwnerIdentifier: string;
  Date: Date;
  AuthorID: number;
  Author: string;
  StateEvents: RequestStateEvent[];
}

export interface RequestStateEvent {
  EventID: number;
  StateID: number;
  Comment: string;
  ManagerID: number;
  Manager: string;
  Date: string;
  Identifier: string;
}

export interface RequestCorrection {
  Date: string
  ID: number
  ShipmentsCorrections: RequestShipmentCorrection[]
}

export interface RequestShipmentCorrection {
  Amount: number
  ShipmentId: number
}
