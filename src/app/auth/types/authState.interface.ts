import { UserFactoring } from '../../shared/types/userFactoring';
import { UserGeneral } from 'src/app/shared/types/userGeneral';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUserGeneral: UserGeneral | null;
  currentUserFactoring: UserFactoring | null;
  adminUserFactoring: UserFactoring | null;
  isLoggedIn: boolean | null;
  validationErrors: string | null;
  successMessage: string;
  isLoading: boolean;
  confirmCode: string;
}
