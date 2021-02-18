import { RequestsResponseInterface } from "./requestResponse.interface";

export interface RequestsStateInterface {
  isLoading: boolean
  error: string | null
  data: RequestsResponseInterface[] | null
  isSubmitting: boolean;
  crudSuccessMessage: string | null;
  crudError: string | null;
}
