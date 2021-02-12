import { DemandResultDataInterface } from './demand-result-data.interface';
import { DemandDataInterface } from './demand-data.interface';
import { DemandMessageInterface } from './demand-message.interface';
import { DemandStepInterface } from './demand-step.interface';
import { DemandRequirementInterface } from './demand-requirement.interface';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { ManagerReferenceInterface } from 'src/app/shared/types/manager/manager-reference.interface';

export interface DemandInterface {
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
  Data: DemandDataInterface;
  Result: DemandResultDataInterface;
  ID: number;
}
