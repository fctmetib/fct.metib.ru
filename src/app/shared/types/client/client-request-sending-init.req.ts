import { RequestSendActivityDataInterface } from './../common/request-send-activity-data.interface';

export interface ClientRequestSendingInitReq {
  ConfirmationCode: string;
  Data: RequestSendActivityDataInterface[]
}
