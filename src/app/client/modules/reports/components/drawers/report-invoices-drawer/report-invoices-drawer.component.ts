import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDrawerLayoutComponent } from '../report-drawer-base/report-drawer-layout.component';
import {
  ReportPeriodDebtorFormComponent
} from '../report-drawer-base/components/report-period-debtor-form/report-period-debtor-form.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import {
  reportByAggregateViewTableConfig, reportByInvoiceViewTableConfig,
  ReportService
} from '../../../../../../shared/services/common/report.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportCard } from '../../../../cabinet/types/common/i-report.card';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { InputModule } from '../../../../../../shared/ui-kit/input/input.module';
import { LabelModule } from '../../../../../../shared/directives/label/label.module';
import { ReportViewPageService } from '../../report-view-page/report-view-page.service';

@Component({
  selector: 'mib-report-invoices-drawer',
  standalone: true,
  imports: [CommonModule, ReportDrawerLayoutComponent, ReportPeriodDebtorFormComponent, ReactiveFormsModule, InputModule, LabelModule],
  templateUrl: './report-invoices-drawer.component.html',
  styleUrls: ['./report-invoices-drawer.component.scss']
})
export class ReportInvoicesDrawerComponent implements OnInit {

  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private data: IReportCard = inject(MAT_DIALOG_DATA);
  private authService = inject(AuthService);
  private reportViewPageService = inject(ReportViewPageService);

  reportLoading$ = new BehaviorSubject(false);
  form: FormGroup = this.fb.group({
    period: this.fb.group({
      DateFrom: [null, Validators.required],
      DateTo: [null, Validators.required]
    }),
    Type: this.data.type,
    PayedAgreement: true,
    CustomerID: this.authService.currentUser$?.value?.userFactoring?.CustomerID || 0,
    DebtorID: 0
  });

  ngOnInit() {
  }

  onReport() {
    this.reportLoading$.next(true);
    this.reportService.invoices({ ...this.form.getRawValue() }).pipe(
      tap(data => {
        this.reportViewPageService.navigateAndSetupTable({
          tableName: this.data.title,
          reportType: this.data.type,
          config: reportByInvoiceViewTableConfig,
          data
        });
      }),
      finalize(() => {
        this.reportLoading$.next(false);
      })
    ).subscribe();
  }

  onClose() {
  }
}
