export interface ShipmentReq {
  AccountNumber: string;
  AccountDate: string;
  InvoiceNumber: string;
  InvoiceDate: Date;
  WaybillNumber: string;
  WaybillDate: Date;
  DateShipment: Date;
  DatePayment: Date;
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
