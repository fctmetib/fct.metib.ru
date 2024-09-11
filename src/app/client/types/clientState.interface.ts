import { Customer } from '../../shared/types/customer/customer';

export interface ClientStateInterface {
  isSubmitting: boolean;
  factoring: Customer | null;
  validationErrors: string | null;
  successMessage: string;
  isLoading: boolean;
}
