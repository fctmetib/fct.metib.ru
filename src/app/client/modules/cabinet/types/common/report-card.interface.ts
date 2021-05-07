import { ControlConfigReportInterface } from './../../../reports/types/common/control-config.interface';
export interface ReportCardInterface {
  title: string;
  description: string;
  link: string;
  type: string;
  config: ControlConfigReportInterface;
}
