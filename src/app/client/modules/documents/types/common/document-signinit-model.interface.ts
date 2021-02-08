import { SignActivityDataModelInterface } from './../../../../../shared/types/common/sign-activity-data-model.interface';
export interface DocumentSigninitModelInterface {
  ConfirmationCode: string;
  Data: SignActivityDataModelInterface;
}
