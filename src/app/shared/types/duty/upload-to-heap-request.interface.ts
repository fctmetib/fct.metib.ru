export interface UploadToHeapRequestInterface {
  CustomerID: number;
  DebtorID: number;
  ChannelCode: string;
  ChannelTypeID: number;
  RefNum: string;
  Waybill: string;
  WaybillDate: Date;
  Invoice: string;
  InvoiceDate: Date;
  DutyDate: Date;
  PaymentDate: Date;
  Summ: number;
  LVDutyID: number;
  Contract: string;
}
