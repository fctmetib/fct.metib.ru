import { ReportArgs } from './report-args.class';
import { ReportColumntInterface } from './report-column.interface';

export interface ReportTypeInterface {
  id: number;
  type: string;
  group: string;
  title: string;
  description: string;
  template?: string;
  args: () => ReportArgs;
  columns?: Array<ReportColumntInterface>;
  click?: (window: any, location: any, reportService: any, record: any) => any;
  details?: (record: any) => ReportArgs;
}
