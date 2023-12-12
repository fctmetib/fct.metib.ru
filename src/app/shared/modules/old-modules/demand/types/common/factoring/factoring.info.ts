import { ManagerReferenceInterface } from "src/app/shared/types/manager/manager-reference.interface";
import { DemandMessageInterface } from "../../demand-message.interface";
import { DemandStepInterface } from "../../demand-step.interface";

export interface FactoringInfo {
  ID: number,
  Messages: DemandMessageInterface[],
  DateCreated: Date,
  DateModify: Date,
  DateStatus: Date,
  Steps: DemandStepInterface[],
  Status: string,
  Type: string,
  Manager: ManagerReferenceInterface
}
