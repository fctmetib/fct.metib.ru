import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDrawerLayoutComponent } from '../report-drawer-base/report-drawer-layout.component';
import {
  ReportPeriodDebtorFormComponent
} from '../report-drawer-base/components/report-period-debtor-form/report-period-debtor-form.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import {
  ReportService
} from '../../../../../../shared/services/common/report.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportCard } from '../../../../cabinet/types/common/i-report.card';
import { AuthService } from '../../../../../../auth/services/auth.service';

// TODO: ДОБАВИТЬ ВЫВОД ТАБЛИЦЫ И УТОЧНИТЬ У БЕКА ПРАВИЛЬНЫЙ RESPONSE ИНТЕРФЕЙС

@Component({
  selector: 'mib-report-payments-income-drawer',
  standalone: true,
  imports: [CommonModule, ReportDrawerLayoutComponent, ReportPeriodDebtorFormComponent, ReactiveFormsModule],
  templateUrl: './report-payments-income-drawer.component.html',
  styleUrls: ['./report-payments-income-drawer.component.scss']
})
export class ReportPaymentsIncomeDrawerComponent implements OnInit {

  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private data: IReportCard = inject(MAT_DIALOG_DATA);
  private authService = inject(AuthService)

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
      PayedAgreement: true,
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
    this.reportService.paymentsIncome({ ...this.form.getRawValue() }).pipe(
      finalize(() => {
        this.reportLoading$.next(false);
      })
    ).subscribe();
  }

  onClose() {
  }
}
