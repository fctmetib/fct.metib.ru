import { FileModeInterface } from "src/app/shared/types/file/file-model.interface";
import { ManagerReferenceInterface } from "src/app/shared/types/manager/manager-reference.interface";
import { DemandMessageInterface } from "./demand-new-message.interface";
import { DemandRequirementInterface } from "./demand-new-requirement.interface";
import { DemandResultDataInterface } from "./demand-new-result-data.interface";
import { DemandStepInterface } from "./demand-new-step.interface";

export interface DemandBaseNewInterface<T> {
  Type: string;
  Status: string;
  User: string;
  Manager: ManagerReferenceInterface;
  DateCreated: Date;
  DateModify: Date;
  DateStatus: Date;
  Requirements: DemandRequirementInterface[];
  Steps: DemandStepInterface[];
  Messages: DemandMessageInterface[];
  Files: FileModeInterface[];
  Data: T;
  Result: DemandResultDataInterface;
  ID: number;
  // Translated
  TranslatedType?: string;
  TranslatedStatus?: string;
  TranslatedResult?: string;
}
