import { PeriodReportArgs } from "./period-report-args.class";

export class AccountTransactionsReportArgs extends PeriodReportArgs {
  OrderNumber: string = "";
  RequestNumber: string = "";

  constructor(type: string, title: string) {
    super(type, title);
  }
}
