import { RequestsResponse } from "./requestResponse.interface";

export interface RequestsStateInterface {
  isLoading: boolean
  error: string | null
  data: RequestsResponse[] | null
  isSubmitting: boolean;
  crudSuccessMessage: string | null;
  crudError: string | null;
}

