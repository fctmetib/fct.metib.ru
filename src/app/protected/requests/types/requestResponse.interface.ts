import { FileModeInterface } from '../../../shared/types/file/file-model.interface';
import { DeliveryReferenceInterface } from '../../../shared/types/delivery/delivery-reference.interface';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { ClientRequestDocumentInterface } from 'src/app/shared/types/client/client-request-document.interface';

export interface RequestsResponseInterface {
  Number: string;
  Date: Date;
  Delivery: DeliveryReferenceInterface;
  Type: string;
  Status: string;
  Summ: number;
  Shipments: ClientShipmentInterface[];
  Documents: ClientRequestDocumentInterface[];
  Files: FileModeInterface[];
  Id: number;
}
