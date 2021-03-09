import { DemandDataInterface } from './demand-data.interface';

export interface DemandDraftInterface {
  User: string;
  DateCreated: Date,
  DateModify: Date,
  Data: DemandDataInterface,
  ID: number
}
