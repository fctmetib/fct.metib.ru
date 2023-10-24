import { MibExtensions } from "../common/mib-extensions.class";
import { ReportArgs } from "./report-args.class";

export class DateReportArgs extends ReportArgs {
  Date: Date = new Date();

  constructor(type: string, title: string) {
    super(type, title);
  }

  isPayed(): boolean {
    var border = MibExtensions.addDays(new Date(), -ReportArgs.PayedDaysCount);
    return this.Date < border;
  }
}
