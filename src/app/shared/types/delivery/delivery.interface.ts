import { DeliveryStatisticsInterface } from './delivery-statistics.interface';
import { DelayInterface } from './../common/delay.interface';
import { CounterpartyReferenceInterface } from './../counterparty/counterparty-reference.interface';

export interface DeliveryInterface {
  Title: string;
  Number: string;
  DateFrom: Date;
  DateTo: Date;
  Tariff: string;
  Customer: CounterpartyReferenceInterface;
  Debtor: CounterpartyReferenceInterface;
  Delay: DelayInterface;
  Statistics: DeliveryStatisticsInterface;
  ID: number;
}

export interface DeliveryRef {
  CurrencyCode: string;
  ContractID: number;
  ID: number;
  Title: string;
  CustomerID: number;
  Customer: string;
  DebtorID: number;
  Debtor: string;
  CounterpartyTitle: string;
  ContractTypeID: number;
  ContractTypeTitle: string;
  ContrAgentRequisites: string;
  StartTime: string;
  EndTime: string;
}
