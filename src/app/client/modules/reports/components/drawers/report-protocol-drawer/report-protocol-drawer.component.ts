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
import { DropdownPointModule } from '../../../../../../shared/ui-kit/dropdown-point/dropdown-point.module';
import { InputModule } from '../../../../../../shared/ui-kit/input/input.module';
import { LabelModule } from '../../../../../../shared/directives/label/label.module';
import { SelectModule } from '../../../../../../shared/ui-kit/select/select.module';

// TODO: ДОЖДАТЬСЯ АПИ И СДЕЛАТЬ ВЫВОД ТАБЛИЦ

@Component({
  selector: 'mib-report-protocol-drawer',
  standalone: true,
  imports: [CommonModule, ReportDrawerLayoutComponent, ReportPeriodDebtorFormComponent, ReactiveFormsModule, DropdownPointModule, InputModule, LabelModule, SelectModule],
  templateUrl: './report-protocol-drawer.component.html',
  styleUrls: ['./report-protocol-drawer.component.scss']
})
export class ReportProtocolDrawerComponent implements OnInit {

  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private data: IReportCard = inject(MAT_DIALOG_DATA);
  private authService = inject(AuthService)

  reportLoading$ = new BehaviorSubject(false);
  form!: FormGroup;

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
      ShipmentStatus: 'undone',
      CustomerID: this.authService.currentUser$?.value?.userFactoring?.CustomerID || 0
    });
  }

  onReport() {
    this.reportLoading$.next(true);
    this.reportService.invoices({ ...this.form.getRawValue() }).pipe(
      finalize(() => {
        this.reportLoading$.next(false);
      })
    ).subscribe();
  }

  onClose() {
  }
}
