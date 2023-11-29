export interface RequestEventsInterface {
  StateID: number;
  Identifier: string;
  Title: string;
  PublicTitle: string;
  OwnerID: number;
  OwnerTypeID: number;
  OwnerIdentifier: string;
  Date: Date;
  AuthorID: number;
  Author: string;
  StateEvents: StateEventsInterface[];
}

export interface StateEventsInterface {
  EventID: number;
  StateID: number;
  Comment: string;
  ManagerID: number;
  Manager: string;
  Date: Date;
  Identifier: string;
}
