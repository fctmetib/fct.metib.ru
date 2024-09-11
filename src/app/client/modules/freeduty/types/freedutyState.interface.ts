import { Duty } from "src/app/shared/types/duty/duty";

export interface FreeDutyStateInterface {
  isLoading: boolean
  error: string | null
  data: Duty[] | null
  isSubmitting: boolean;
  crudSuccessMessage: string | null;
  crudError: string | null;
}
