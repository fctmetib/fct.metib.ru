import { DutyContractInterface } from "./duty-contract.interface";
import { DutyStatisticsInterface } from "./duty-statistics.interface";

export interface DutyInterface {
  Number: string;
  NumberInvoice: string;
  DateDuty: Date;
  DateWaybill: Date;
  DatePayment: Date;
  Summ: number;
  Rest: number;
  Contract: DutyContractInterface;
  Statistics: DutyStatisticsInterface;
  ID: number;
}
