import { CurrentUserFactoring } from '../../shared/types/currentUserFactoring';
import { CurrentUserGeneral } from 'src/app/shared/types/currentUserGeneral';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUserGeneral: CurrentUserGeneral | null;
  currentUserFactoring: CurrentUserFactoring | null;
  adminUserFactoring: CurrentUserFactoring | null;
  isLoggedIn: boolean | null;
  validationErrors: string | null;
  successMessage: string;
  isLoading: boolean;
  confirmCode: string;
}
