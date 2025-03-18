import { Component, forwardRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from '../../../../../../../../shared/ui-kit/select/select.module';
import { InputModule } from '../../../../../../../../shared/ui-kit/input/input.module';
import { LabelModule } from '../../../../../../../../shared/directives/label/label.module';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DropdownPointModule } from '../../../../../../../../shared/ui-kit/dropdown-point/dropdown-point.module';
import { DeliveryService } from '../../../../../../../../shared/services/share/delivery.service';
import { DeliveryInterface } from '../../../../../../../../shared/types/delivery/delivery.interface';
import { tap } from 'rxjs';
import {
  CounterpartyReferenceInterface
} from '../../../../../../../../shared/types/counterparty/counterparty-reference.interface';

@Component({
  selector: 'mib-report-period-debtor-form',
  standalone: true,
  imports: [CommonModule, SelectModule, InputModule, LabelModule, PaginatorModule, ReactiveFormsModule, DropdownPointModule],
  templateUrl: './report-period-debtor-form.component.html',
  styleUrls: ['./report-period-debtor-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReportPeriodDebtorFormComponent),
      multi: true
    }
  ]
})
export class ReportPeriodDebtorFormComponent implements OnInit, ControlValueAccessor {

  private fb = inject(FormBuilder);
  private deliveryService = inject(DeliveryService)

  deliveries: DeliveryInterface[] = []
  debtors: CounterpartyReferenceInterface[] = []

  form!: FormGroup;
  onTouched: () => void = () => {
  };
  onChange: (value: any) => void = () => {
  };

  ngOnInit() {
    this.form = this.fb.group({
      period: this.fb.group({
        DateFrom: [null],
        DateTo: [null]
      }),
      DebtorID: [null]
    });

    this.deliveryService.getDeliveriesV2().pipe(
      tap(deliveries => {
        this.deliveries = deliveries;

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

    this.form.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  selectDebtor(ID: number) {
  }
}
