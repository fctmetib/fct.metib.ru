import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDrawerLayoutComponent } from '../report-drawer-base/report-drawer-layout.component';
import {
  ReportPeriodDebtorFormComponent
} from '../report-drawer-base/components/report-period-debtor-form/report-period-debtor-form.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import {
  reportByAggregateDeliveryViewTableConfig,
  reportByAggregateViewTableConfig,
  ReportService
} from '../../../../../../shared/services/common/report.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportCard } from '../../../../cabinet/types/common/i-report.card';
import { InformationModule } from '../../../../../../shared/ui-kit/information/information.module';
import { SpacingModule } from '../../../../../../shared/ui-kit/spacing/spacing.module';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { ReportViewPageService } from '../../report-view-page/report-view-page.service';

@Component({
  selector: 'mib-report-aggregate-delivery-drawer',
  standalone: true,
  imports: [CommonModule, ReportDrawerLayoutComponent, ReportPeriodDebtorFormComponent, ReactiveFormsModule, InformationModule, SpacingModule],
  templateUrl: './report-aggregate-delivery-drawer.component.html',
  styleUrls: ['./report-aggregate-delivery-drawer.component.scss']
})
export class ReportAggregateDeliveryDrawerComponent implements OnInit {

  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private data: IReportCard = inject(MAT_DIALOG_DATA);
  private authService = inject(AuthService)
  private reportViewPageService = inject(ReportViewPageService)

  reportLoading$ = new BehaviorSubject(false);
  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      Date: new Date().toISOString(),
      Title: this.data.title,
      Type: this.data.type,
      PayedAgreement: true,
      DebtorID: 0,
      CustomerID: this.authService.currentUser$?.value?.userFactoring?.CustomerID || 0
    });
  }

  onReport() {
    this.reportLoading$.next(true);
    this.reportService.aggregateDelivery({ ...this.form.getRawValue() }).pipe(
      tap(data => {
        this.reportViewPageService.navigateAndSetupTable({
          tableName: this.data.title,
          reportType: this.data.type,
          config: reportByAggregateDeliveryViewTableConfig,
          data
        })
      }),
      finalize(() => {
        this.reportLoading$.next(false);
      })
    ).subscribe();
  }

  onClose() {
  }
}
