export interface ShipmentReq {
  AccountNumber: string;
  AccountDate: string;
  InvoiceNumber: string;
  InvoiceDate: string;
  // Вот вроде было это поле в интерфейсе
  WaybillNumber: string;
  // Но возвращается вот это поле
  Waybill: string;
  WaybillDate: string;
  DateShipment: string;
  DatePayment: string;
  Summ: number;
  SummToFactor: number;
}


export interface Shipment extends ShipmentReq {
  ID: number;
}

export interface DeliveryAgreementReq {
  CurrencyCode: string;
  Title: string;
  CustomerID: number;
  Customer: string;
  DebtorID: number;
  Debtor: string;
}

export interface DeliveryAgreement extends DeliveryAgreementReq {
  ID: number;
}

export interface SelectedDeliveryInterface {
  ID: number;
  ContractTypeID: number;
}