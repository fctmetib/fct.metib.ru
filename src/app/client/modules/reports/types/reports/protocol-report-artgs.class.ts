import { PeriodReportArgs } from "./period-report-args.class";

export class ProtocolReportArgs extends PeriodReportArgs {
  OnlyPayed: boolean = true;
  CreatedBy: string = "me";

  constructor(type: string, title: string) {
    super(type, title);
  }
}
