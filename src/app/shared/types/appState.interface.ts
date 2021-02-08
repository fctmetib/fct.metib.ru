
import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import { RequestsStateInterface } from 'src/app/client/modules/requests/types/requestsState.interface';
import { ClientStateInterface } from 'src/app/client/types/clientState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  requests: RequestsStateInterface;
  client: ClientStateInterface;
}
