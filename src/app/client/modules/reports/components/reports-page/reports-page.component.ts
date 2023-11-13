import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { ReportCardInterface } from '../../../cabinet/types/common/report-card.interface';
import { ControlConfigReportInterface } from '../../types/common/control-config.interface';
import { ReportInitDialogComponent } from '../report-init-dialog/report-init-dialog.component';
import { ReportService } from 'src/app/shared/services/common/report.service';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent implements OnInit {
  public reportCards: ReportCardInterface[] = [];
  ref: DynamicDialogRef;

  constructor(
    public dialogService: DialogService, 
    private reportService: ReportService,
    private router: Router) {}

  ngOnInit() {
    let mibCommon = new MIBCommon();
    this.reportCards = mibCommon.getReports();
  }

  show(title: string, type: string, config: ControlConfigReportInterface) {
    this.ref = this.dialogService.open(ReportInitDialogComponent, {
      header: title,
      data: {type: type, config: config},
      width: '70%',
      contentStyle: { 'height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        data.type = type;
        data.title = title;

        this.openReportDetails(data);
      }
    });
  }

  private openReportDetails(data) {
    this.reportService.reportData$.next(data);
    this.router.navigate(['/client/reports/report-view']);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
