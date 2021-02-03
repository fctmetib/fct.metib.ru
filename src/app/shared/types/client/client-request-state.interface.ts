import { ClientRequestStateEventInterface } from './client-request-state-event.interface';
export interface ClientRequestStateInterface {
  Name: string;
  Title: string;
  Date: Date;
  Events: ClientRequestStateEventInterface[]
}
