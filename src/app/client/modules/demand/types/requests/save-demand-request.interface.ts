import { DemandDataInterface } from './../demand-data.interface';

export interface SaveDemandRequestInterface {
  Data: DemandDataInterface;
  DraftID: number;
}
