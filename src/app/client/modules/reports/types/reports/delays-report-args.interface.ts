import { MibExtensions } from "../common/mib-extensions.class";
import { DateReportArgs } from "./date-report-args.class";

export class DelaysReportArgs extends DateReportArgs {
  Delay: number = 0;
  DebtorID: number = 0;

  constructor(type: string, title: string, delay?: number) {
    super(type, title);
    this.Date = MibExtensions.addDays(new Date(), -1);
    this.Delay = delay || 0;
  }
}
