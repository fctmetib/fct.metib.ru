import { IControlConfigReport } from '../../../reports/types/common/control-config.interface';

export interface IReportCard {
  title: string;
  description: string;
  link: string;
  type: string;
  config: IControlConfigReport;
}
