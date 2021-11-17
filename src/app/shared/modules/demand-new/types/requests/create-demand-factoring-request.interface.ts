import { DemandAnketInterface } from '../demand-anket.interface';
import { DemandDataBaseInterface } from '../demand-data-base.interface';
import { DemandFactoringInterface } from '../demand-factoring.interface';


export interface CreateDemandFactoringRequestInterface
  extends DemandDataBaseInterface {
  Anket: DemandAnketInterface;
  Factoring: DemandFactoringInterface;
}
