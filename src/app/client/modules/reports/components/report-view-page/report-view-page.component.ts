import { ReportService } from './../../services/report.service';
import { CryptoService } from './../../../../../shared/services/common/crypto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-report-view-page',
  templateUrl: './report-view-page.component.html',
  styleUrls: ['./report-view-page.component.scss']
})
export class ReportViewPageComponent implements OnInit {

  public isError: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private reportService: ReportService,
      private cryptoService: CryptoService
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['dt']) {
        let data = JSON.parse(this.cryptoService.decrypt(params['dt']));
        this.fetchReport(data);
      } else {
        this.isError = true;
      }
    });
  }

  private fetchReport(data) {
    let request = {
      CustomerID: 0,
      DateFrom: new Date(data.dateFrom),
      DateTo: new Date(data.dateTo),
      DebtorID: data.debitor,
      Export: "JSON",
      PayedAgreement: data?.payed ? true : false,
      Title: data.title,
      Type: data.type
    }

    this.reportService.getReport(request).subscribe(resp => {

    });
  }
}
