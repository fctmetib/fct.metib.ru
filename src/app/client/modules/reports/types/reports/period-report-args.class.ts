import { MibExtensions } from "../common/mib-extensions.class";
import { ReportArgs } from "./report-args.class";

export class PeriodReportArgs extends ReportArgs {
  DateFrom: Date = MibExtensions.addDays(new Date(), -1);
  DateTo: Date = new Date();

  constructor(type: string, title: string) {
    super(type, title);
  }

  isPayed(): boolean {
    var border = MibExtensions.addDays(new Date(), -ReportArgs.PayedDaysCount);
    return this.DateFrom < border || this.DateTo < border;
  }
}
