import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDrawerLayoutComponent } from '../report-drawer-base/report-drawer-layout.component';
import {
  ReportPeriodDebtorFormComponent
} from '../report-drawer-base/components/report-period-debtor-form/report-period-debtor-form.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import {
  reportByAggregateViewTableConfig,
  ReportService
} from '../../../../../../shared/services/common/report.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportCard } from '../../../../cabinet/types/common/i-report.card';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { ReportViewPageService } from '../../report-view-page/report-view-page.service';

@Component({
  selector: 'mib-report-aggregate-drawer',
  standalone: true,
  imports: [CommonModule, ReportDrawerLayoutComponent, ReportPeriodDebtorFormComponent, ReactiveFormsModule],
  templateUrl: './report-shipment-correction-drawer.component.html',
  styleUrls: ['./report-shipment-correction-drawer.component.scss']
})
export class ReportShipmentCorrectionDrawerComponent implements OnInit {

  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private data: IReportCard = inject(MAT_DIALOG_DATA);
  private authService = inject(AuthService)
  private reportViewPageService = inject(ReportViewPageService)

  reportLoading$ = new BehaviorSubject(false);
  form!: FormGroup;
  periodDebtorControl = new FormControl();

  ngOnInit() {
    this.form = this.fb.group({
      period: this.fb.group({
        DateFrom: [null, Validators.required],
        DateTo: [null, Validators.required]
      }),
      DebtorID: [0, Validators.required],
      Title: this.data.title,
      Type: this.data.type,
      PayedAgreement: false,
      CustomerID: this.authService.currentUser$?.value?.userFactoring?.CustomerID || 0
    });

    this.periodDebtorControl.valueChanges.pipe(
      tap(data => {
        this.form.patchValue(data);
      })
    ).subscribe();
  }

  onReport() {
    this.reportLoading$.next(true);
    this.reportService.shipmentCorrection({ ...this.form.getRawValue() }).pipe(
      tap(data => {
        this.reportViewPageService.navigateAndSetupTable({
          tableName: this.data.title,
          reportType: this.data.type,
          config: reportByAggregateViewTableConfig,
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
