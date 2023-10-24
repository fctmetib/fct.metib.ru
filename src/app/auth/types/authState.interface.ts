import { CurrentUserFactoringInterface } from '../../shared/types/currentUserFactoring.interface';
import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUserGeneral: CurrentUserGeneralInterface | null;
  currentUserFactoring: CurrentUserFactoringInterface | null;
  adminUserFactoring: CurrentUserFactoringInterface | null;
  isLoggedIn: boolean | null;
  validationErrors: string | null;
  successMessage: string;
  isLoading: boolean;
  confirmCode: string;
}
