import { DemandInterface } from "./demand.interface";

export interface DemandsStateInterface {
  isLoading: boolean
  error: string | null
  data: DemandInterface<any>[] | null
  drafts: DemandInterface<any>[] | null
}
