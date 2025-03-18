import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDrawerLayoutComponent } from '../report-drawer-base/report-drawer-layout.component';
import {
  ReportPeriodDebtorFormComponent
} from '../report-drawer-base/components/report-period-debtor-form/report-period-debtor-form.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import {
  IDataByAggregate,
  reportByAggregateViewTableConfig,
  ReportService
} from '../../../../../../shared/services/common/report.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportCard } from '../../../../cabinet/types/common/i-report.card';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { InputModule } from '../../../../../../shared/ui-kit/input/input.module';
import { LabelModule } from '../../../../../../shared/directives/label/label.module';
import { DropdownPointModule } from '../../../../../../shared/ui-kit/dropdown-point/dropdown-point.module';
import { SelectModule } from '../../../../../../shared/ui-kit/select/select.module';
import {
  CounterpartyReferenceInterface
} from '../../../../../../shared/types/counterparty/counterparty-reference.interface';
import { DeliveryService } from '../../../../../../shared/services/share/delivery.service';
import { ReportViewPageService } from '../../report-view-page/report-view-page.service';

@Component({
  selector: 'mib-report-debtor-delay-drawer',
  standalone: true,
  imports: [CommonModule, ReportDrawerLayoutComponent, ReportPeriodDebtorFormComponent, ReactiveFormsModule, InputModule, LabelModule, DropdownPointModule, SelectModule],
  templateUrl: './report-debtor-delay-drawer.component.html',
  styleUrls: ['./report-debtor-delay-drawer.component.scss']
})
export class  ReportDebtorDelayDrawerComponent implements OnInit {

  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private data: IReportCard = inject(MAT_DIALOG_DATA);
  private authService = inject(AuthService)
  private deliveryService = inject(DeliveryService)
  private reportViewPageService = inject(ReportViewPageService)

  debtors: CounterpartyReferenceInterface[] = []

  reportLoading$ = new BehaviorSubject(false);
  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      Date: [null, Validators.required],
      DebtorID: [0, Validators.required],
      Title: this.data.title,
      Type: this.data.type,
      PayedAgreement: false,
      Delay: [0],
      CustomerID: this.authService.currentUser$?.value?.userFactoring?.CustomerID
    });

    this.deliveryService.getDeliveriesV2().pipe(
      tap(deliveries => {

        const uniqDebtorIds = new Set<number>();
        this.debtors = [];

        for (const delivery of deliveries) {
          if (!uniqDebtorIds.has(delivery.Debtor.ID)) {
            uniqDebtorIds.add(delivery.Debtor.ID);
            this.debtors.push(delivery.Debtor);
          }
        }
      })
    ).subscribe()
  }

  onReport() {
    this.reportLoading$.next(true);
    this.reportService.debtorDelay({ ...this.form.getRawValue() }).pipe(
      tap(data => {
        this.reportViewPageService.navigateAndSetupTable({
          tableName: this.data.title,
          reportType: this.data.type,
          config: reportByAggregateViewTableConfig,
          data: data as any
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
