import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { ClientRequestDocumentInterface } from 'src/app/shared/types/client/client-request-document.interface';
import { DeliveryReferenceInterface } from 'src/app/shared/types/delivery/delivery-reference.interface';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';

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
  ID: number;
}
