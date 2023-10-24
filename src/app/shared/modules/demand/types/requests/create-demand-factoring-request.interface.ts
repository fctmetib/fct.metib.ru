import { DemandDataBaseInterface } from '../demand-data-base.interface';
import { DemandAnketInterface } from '../common/demand-anket.interface';
import { DemandFactoringInterface } from '../common/demand-factoring.interface';

export interface CreateDemandFactoringRequestInterface
  extends DemandDataBaseInterface {
  Anket: DemandAnketInterface;
  Factoring: DemandFactoringInterface;
}
