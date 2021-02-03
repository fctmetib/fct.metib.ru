import { RequestSendInterface } from './request-send.interface';

export interface RequestSendActivityDataInterface {
  SignActivityCode: string;
  Requests: RequestSendInterface[]
}
