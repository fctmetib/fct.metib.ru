export interface Tariff {
  Identifier: string;
  Title: string;
}

export interface Organization {
  ID: number;
  OrganizationID: number;
  INN: string;
  Title: string;
}

export interface Delay {
  Count: number;
  Day: number;
  Work: boolean;
  Min: number;
  Max: number;
}

export interface Statistics {
  Count: number;
  DutyDebtor: number;
  DutyCustomer: number;
  DelayDuty: number;
  FreeLimit: number;
}

export interface Delivery {
  ID: number;
  Title: string;
  Number: string;
  DateFrom: string;
  DateTo: string;
  Tariff: Tariff;
  Customer: Organization;
  Debtor: Organization;
  Delay: Delay;
  Statistics: Statistics;
}

export interface AdvancedDelivery extends Delivery {
  AdvancedContract?: boolean;
}
