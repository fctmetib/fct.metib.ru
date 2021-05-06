
export class ReportArgs {
  static PayedDaysCount: number = 120;

  Type: string = "";
  Title: string = "";
  Export: string = "JSON";

  CustomerID: number = 0;
  PayedAgreement: boolean = false;

  constructor(type: string, title: string) {
    this.Type = type || "";
    this.Title = title || "";
  }

  isPayed(): boolean {
    return false;
  }
}
