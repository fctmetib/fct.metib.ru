import { RequestSendActivityDataInterface } from './../common/request-send-activity-data.interface';

export interface ClientRequestSendingInitRequestInterface {
  ConfirmationCode: string;
  Data: RequestSendActivityDataInterface[]
}
