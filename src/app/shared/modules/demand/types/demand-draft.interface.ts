
export interface DemandDraftInterface<T> {
  User: string;
  DateCreated: Date,
  DateModify: Date,
  Data: T,
  ID: number
}
