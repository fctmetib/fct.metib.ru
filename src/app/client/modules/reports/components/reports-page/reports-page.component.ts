import { Component, OnInit } from '@angular/core';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { ReportCardInterface } from '../../../cabinet/types/common/report-card.interface';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {

  public reportCards: ReportCardInterface[] = [];

  constructor() {}

  ngOnInit() {
    let mibCommon = new MIBCommon();
    this.reportCards = mibCommon.getReports();
  }
}
