export interface ShipmentInterface {
  Request: {
    RequestID: number;
    Number: string;
    Date: string;
    ID: number;
  };
  Account: string;
  Waybill: string;
  Invoice: string;
  DateShipment: string;
  DatePayment: string;
  DateAddon: string;
  Summ: number;
  DutyDebtor: number;
  DutyCustomer: number;
  ID: number;
}
