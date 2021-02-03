import { FileModeInterface } from './../file/file-model.interface';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { RequestSourceEnum } from './../enums/request-source.enum';
import { RequestTypeEnum } from '../enums/request-type.enum';

export interface ClientRequestInterface {
  DeliveryID: number;
  Type: RequestTypeEnum;
  Source: RequestSourceEnum,
  Number: string;
  Title: string;
  Date: Date;
  AgencyFlag: boolean;
  Shipments: ClientShipmentInterface[];
  Files: FileModeInterface[]
}
