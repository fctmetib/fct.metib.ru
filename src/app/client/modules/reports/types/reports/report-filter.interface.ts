import { AccountModel } from "./account-model.class";

export class ReportFilter {
  Accounts: Array<AccountModel> = new Array<AccountModel>();
  ByGroup: boolean = true;

  constructor(data?: any) {
    if (data) {
      var t = new Array<AccountModel>();
      data.forEach(function (el) {
        t.push(new AccountModel({ Number: el }));
      });

      this.Accounts = t;
    }
  }
}
