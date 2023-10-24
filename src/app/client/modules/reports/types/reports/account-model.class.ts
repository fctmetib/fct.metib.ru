export class AccountModel {
  Number: string = "";
  BIK: string = "";
  COR: string = "";
  Bank: string = "";
  constructor(data?: any) {
    if (data) {
      this.Number = (data.Number || "").replace(/[^0-9]/g, "");
      this.BIK = data.BIK || "";
      this.COR = data.COR || "";
      this.Bank = data.Bank || "";
    }
  }
}
