import { DemandInterface } from "./demand.interface";

export interface DemandsStateInterface {
  isLoading: boolean
  error: string | null
  data: DemandInterface[] | null
}
