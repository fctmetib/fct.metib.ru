import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDrawerLayoutComponent } from '../report-drawer-base/report-drawer-layout.component';
import {
  ReportPeriodDebtorFormComponent
} from '../report-drawer-base/components/report-period-debtor-form/report-period-debtor-form.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import {
  reportByAggregateViewTableConfig, reportByExternalViewTableConfig,
  ReportService
} from '../../../../../../shared/services/common/report.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportCard } from '../../../../cabinet/types/common/i-report.card';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { DropdownPointModule } from '../../../../../../shared/ui-kit/dropdown-point/dropdown-point.module';
import { InputModule } from '../../../../../../shared/ui-kit/input/input.module';
import { LabelModule } from '../../../../../../shared/directives/label/label.module';
import { SelectModule } from '../../../../../../shared/ui-kit/select/select.module';
import { ReportViewPageService } from '../../report-view-page/report-view-page.service';

@Component({
  selector: 'mib-report-extract-external-drawer',
  standalone: true,
  imports: [CommonModule, ReportDrawerLayoutComponent, ReportPeriodDebtorFormComponent, ReactiveFormsModule, DropdownPointModule, InputModule, LabelModule, SelectModule],
  templateUrl: './report-extract-external-drawer.component.html',
  styleUrls: ['./report-extract-external-drawer.component.scss']
})
export class ReportExtractExternalDrawerComponent implements OnInit {

  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private data: IReportCard = inject(MAT_DIALOG_DATA);
  private authService = inject(AuthService)
  private reportViewPageService = inject(ReportViewPageService)

  reportLoading$ = new BehaviorSubject(false);
  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      period: this.fb.group({
        DateFrom: [null, Validators.required],
        DateTo: [null, Validators.required]
      }),
      Title: this.data.title,
      Type: this.data.type,
      PayedAgreement: true,
      OrderNumber: [null, Validators.required],
      RequestNumber: [null, Validators.required],
      CustomerID: this.authService.currentUser$?.value?.userFactoring?.CustomerID || 0,
      DebtorID: 0
    });
  }

  onReport() {
    this.reportLoading$.next(true);
    this.reportService.extractExternal({ ...this.form.getRawValue() }).pipe(
      tap(data => {
        this.reportViewPageService.navigateAndSetupTable({
          tableName: this.data.title,
          reportType: this.data.type,
          config: reportByExternalViewTableConfig,
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
