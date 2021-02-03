import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import { RequestsStateInterface } from 'src/app/protected/modules/requests/types/requestsState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  requests: RequestsStateInterface;
}
