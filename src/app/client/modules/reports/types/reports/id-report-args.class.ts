import { ReportArgs } from "./report-args.class";

export class IDReportArgs extends ReportArgs {
  ID: number = 0;
  Label: string = "";

  constructor(type: string, title: string, id?: number, label?: string) {
    super(type, title);

    this.ID = id || 0;
    this.Label = label || "Номер";
  }

  isPayed(): boolean {
    return false;
  }
}
