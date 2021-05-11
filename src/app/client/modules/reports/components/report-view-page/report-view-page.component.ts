import { ReportType } from './../../types/reports/report-type.class';
import { ReportService } from './../../services/report.service';
import { CryptoService } from './../../../../../shared/services/common/crypto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportTypeInterface } from '../../types/reports/report-type.interface';

@Component({
  selector: 'app-report-view-page',
  templateUrl: './report-view-page.component.html',
  styleUrls: ['./report-view-page.component.scss']
})
export class ReportViewPageComponent implements OnInit {

  public isLoading: boolean = false;
  public isError: boolean = false;
  public reportConfig: ReportTypeInterface;
  public reportData: any[] = [];

  private data: any;

  constructor(
      private route: ActivatedRoute,
      private reportService: ReportService,
      private cryptoService: CryptoService
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['dt']) {
        this.data = JSON.parse(this.cryptoService.decrypt(params['dt']));
        this.prepareTable();
        this.fetchReport();
      } else {
        this.isError = true;
      }
    });
  }

  private prepareTable(): void {
    this.reportConfig = ReportType.getType(this.data.type)
    console.log(this.reportConfig)
  }

  private fetchReport(): void {
    this.isLoading = true;
    let data = this.data;

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
      this.reportData = resp;
      this.isLoading = false;
    });
  }
}
