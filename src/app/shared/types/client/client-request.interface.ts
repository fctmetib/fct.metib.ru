import { FileModeInterface } from './../file/file-model.interface';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { RequestSourceEnum } from './../enums/request-source.enum';
import { RequestTypeEnum } from '../enums/request-type.enum';

export interface ClientRequestInterface {
  ID?: number;
  Number?: string;
  Date: Date;
  Delivery?: {
    ID: number;
    Debtor?: string;
    DebtorID?: number;
    Customer?: string;
    CustomerID?: number;
    Title?: string;
    CurrencyCode?: string;
  };
  Type: RequestTypeEnum;
  Status?: string;
  Summ?: number;
  ReadOnly?: boolean;
  IsCorrected?: boolean;
  Shipments: ClientShipmentInterface[];
  Documents?: any[];

  DeliveryID?: number;
  Source?: RequestSourceEnum,
  Title?: string;
  AgencyFlag?: boolean;
  Files?: FileModeInterface[]
}
// {"DeliveryID":20940,"Type":"Financing","Number":"","Title":"","Date":"2021-03-17T09:53:34+03:00","Shipments":[],"Files":[]}
