import { DemandDataBaseInterface } from './demand-data-base.interface';
import { FileMode } from 'src/app/shared/types/file/file-model.interface';
import { ManagerReferenceInterface } from 'src/app/shared/types/manager/manager-reference.interface';
import { DemandRequirementInterface } from './demand-new-requirement.interface';
import { DemandStepInterface } from './demand-new-step.interface';
import { DemandMessageInterface } from './demand-new-message.interface';
import { DemandResultDataInterface } from './demand-new-result-data.interface';

export interface DemandInterface<T> {
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
  Files: FileMode[];
  Data: T;
  Result: DemandResultDataInterface;
  ID: number;
  // Translated
  TranslatedType?: string;
  TranslatedStatus?: string;
  TranslatedResult?: string;
}
