import { CustomerInterface } from './../../shared/types/customer/customer.interface';

export interface ClientStateInterface {
  isSubmitting: boolean;
  factoring: CustomerInterface | null;
  validationErrors: string | null;
  successMessage: string;
  isLoading: boolean;
}
