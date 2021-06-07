import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { DemandAnketInterface } from './common/demand-anket.interface';
import { DemandFactoringInterface } from './common/demand-factoring.interface';

export interface DemandDataBaseInterface {
  Type: string;
  Files: FileModeInterface[];
  Anket?: DemandAnketInterface;
  Factoring?: DemandFactoringInterface
}
