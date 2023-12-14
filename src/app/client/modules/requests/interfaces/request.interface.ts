import {FileMode} from '../../../../shared/types/file/file-model.interface';
import {DeliveryAgreement, Shipment} from '../modules/shipment-drawer/interfaces/shipment.interface';
import {Base64Url} from '../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';

export enum RequestStatusEnum {

}

export enum RequestTypeEnum {
  NON_FINANCING = 'NonFinancing',
  FINANCING = 'Financing',
  CORRECTION = 'Correction'
}


export interface RequestReq {
  Number: string;
  Date: string;
  Delivery: DeliveryAgreement;
  Type: RequestTypeEnum;
  Status: RequestStatusEnum;
  Summ: number;
  ReadOnly: boolean;
  IsCorrected: boolean;
  Shipments: Shipment[];
  Documents: Document[];
  Files: FileMode[];
}

export interface RequestRes extends RequestReq {
  ID: number;
}

export interface Document {
  Number?: string;
  Title?: string;
  Location?: string;
  Description?: string;
  DocumentStatusID?: number;
  DocumentStatus?: string;
  DocumentTypeID: number;
  DocumentType?: string;
  DocumentTypeTitle?: string;
  Available?: boolean;
  Removed?: boolean;
  ActiveOrganizationID?: number;
  ActiveOrganization?: string;
  CreatedTime?: Date;
  AuthorOrganizationID?: number;
  AuthorOrganization?: string;
  CreatorLastName?: string;
  CreatorFirstName?: string;
  DocumentID?: number;
  OwnerTypeID: number;
  OwnerID: number;
  Data?: Base64Url;
}
