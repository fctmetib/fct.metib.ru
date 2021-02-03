import { DocumentInterface } from './document.interface';

export interface RequestSendInterface {
  ID: number;
  Number: string;
  Date: Date;
  Summ: number;
  Debtor: string;
  Delivery: string;
  Documents: DocumentInterface[]
}
