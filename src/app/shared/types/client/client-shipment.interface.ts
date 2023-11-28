export interface ClientShipmentInterface {
  AccountNumber?: string;
  AccountDate?: Date;
  InvoiceNumber: string;
  InvoiceDate: Date;
  WaybillNumber: string;
  WaybillDate: Date;
  DateShipment: Date;
  DatePayment?: Date;
  Summ: number;
  SummToFactor?: number;
  ID: number;
}
