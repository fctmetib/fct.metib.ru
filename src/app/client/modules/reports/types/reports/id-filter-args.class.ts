import { ReportArgs } from "./report-args.class";
import { ReportFilter } from "./report-filter.interface";

export class IDFilterArgs extends ReportArgs {
  ID: number = 0;
  Label: string = "";
  Filter: ReportFilter = new ReportFilter(["47423", "47816"]);

  constructor(type: string, title: string, id?: number, label?: string) {
    super(type, title);
    this.ID = id || 0;
    this.Label = label || "Номер";
  }

  isPayed(): boolean {
    return false;
  }
}
