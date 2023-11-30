import {DutyContractInterface} from './duty-contract.interface';
import {DutyStatisticsInterface} from './duty-statistics.interface';

export interface Duty {
  ID: number;
  Code: null;
  ContractAddonID: number;
  Contract: Contract;
  Number: string;
  DateWaybill: Date;
  NumberInvoice: string;
  DateInvoice: Date;
  Date: Date;
  DateContract: Date;
  DatePayment: Date;
  Rest: number;
  Summ: number;
  Type: string;
  RefNum: string;
  Statistics: Statistics;
}

export interface Contract {
  ID: number;
  Code: string;
  Number: string;
  Client: string;
  Counterparty: string;
}

export interface Statistics {
  ShipmentID: number;
  StopShipmentID: number;
  PaymentExpire: boolean;
  Comment: string;
}
