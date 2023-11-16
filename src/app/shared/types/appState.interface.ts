import { RequestsStateInterface } from 'src/app/client/modules/requests/types/requestsState.interface';
import { ClientStateInterface } from 'src/app/client/types/clientState.interface';
import { FreeDutyStateInterface } from 'src/app/client/modules/freeduty/types/freedutyState.interface';
import { DemandsStateInterface } from '../modules/demand/types/demandsState.interface';

export interface AppStateInterface {
  client: ClientStateInterface;
  demands: DemandsStateInterface;
  requests: RequestsStateInterface;
  freeduty: FreeDutyStateInterface;
}
