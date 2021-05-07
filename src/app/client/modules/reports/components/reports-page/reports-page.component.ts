import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { ReportCardInterface } from '../../../cabinet/types/common/report-card.interface';
import { ReportInitDialogComponent } from '../report-init-dialog/report-init-dialog.component';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent implements OnInit {
  public reportCards: ReportCardInterface[] = [];
  ref: DynamicDialogRef;

  constructor(public dialogService: DialogService) {}

  ngOnInit() {
    let mibCommon = new MIBCommon();
    this.reportCards = mibCommon.getReports();
  }

  show(type: string) {
    this.ref = this.dialogService.open(ReportInitDialogComponent, {
      header: 'Choose a Product',
      data: {type: type},
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {

      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
