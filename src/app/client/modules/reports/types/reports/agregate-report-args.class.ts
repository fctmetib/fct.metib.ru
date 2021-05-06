import { DateReportArgs } from "./date-report-args.class";

export class AgregateReportArgs extends DateReportArgs {
  ShipmentStatus: string = "";
  DebtorID: number = 0;

  constructor(type: string, title: string, status?: string) {
    super(type, title);
    this.ShipmentStatus = status || "";
  }
}
