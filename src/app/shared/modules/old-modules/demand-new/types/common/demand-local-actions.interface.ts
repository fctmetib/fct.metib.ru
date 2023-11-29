import { DemandAction } from "./demand-action";

export interface DemandLocalActionsInterface {
  text: string;
  url: string;
  isForNewClient: boolean;
  isForDefaultClient: boolean;
  action: DemandAction
}
