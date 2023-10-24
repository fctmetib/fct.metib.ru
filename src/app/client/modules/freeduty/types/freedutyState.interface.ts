import { DutyInterface } from "src/app/shared/types/duty/duty.interface";

export interface FreeDutyStateInterface {
  isLoading: boolean
  error: string | null
  data: DutyInterface[] | null
  isSubmitting: boolean;
  crudSuccessMessage: string | null;
  crudError: string | null;
}
