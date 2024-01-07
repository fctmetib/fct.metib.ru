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
	Documents: Document[]
	Files: FileMode[]
}

export interface RequestRes extends RequestReq {
	ID: number
}

export interface Document {
	Number?: string
	Title?: string
	Location?: string
	Description?: string
	DocumentStatusID?: number
	DocumentStatus?: string
	DocumentTypeID: number
	DocumentType?: string
	DocumentTypeTitle?: string
	Available?: boolean
	Removed?: boolean
	ActiveOrganizationID?: number
	ActiveOrganization?: string
	CreatedTime?: Date
	AuthorOrganizationID?: number
	AuthorOrganization?: string
	CreatorLastName?: string
	CreatorFirstName?: string
	DocumentID?: number
	OwnerTypeID: number
	OwnerID: number
	Data?: string
}

export interface RequestState {
  Name: string;
  Title: string;
  Date: Date;
  Events: RequestStateEvent[]
}

export interface RequestStateEvent {
  Identifier: string;
  Comment: string;
  Manager: string;
  Date: string;
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
