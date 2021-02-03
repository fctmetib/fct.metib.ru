import { RequestsResponseInterface } from "./requestResponse.interface";

export interface RequestsStateInterface {
  isLoading: boolean
  error: string | null
  data: RequestsResponseInterface[] | null
}
