import { ReportArgs } from "./report-args.class";

export class OrderReportArgs extends ReportArgs {
  OrderID: number = 0;

  constructor(type: string, title: string, id?: number) {
    super(type, title);
    this.OrderID = id || 0;
  }

  isPayed(): boolean {
    return false;
  }
}
