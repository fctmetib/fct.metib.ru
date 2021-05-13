import { CounterpartyReferenceInterface } from './../../../../../shared/types/counterparty/counterparty-reference.interface';
import { MibArray } from './../../../../../shared/classes/arrays/mib-array.class';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ControlConfigReportInterface } from '../../types/common/control-config.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveryService } from 'src/app/shared/services/share/delivery.service';
import { DeliveryInterface } from 'src/app/shared/types/delivery/delivery.interface';

@Component({
  selector: 'app-report-init-dialog',
  templateUrl: './report-init-dialog.component.html',
  styleUrls: ['./report-init-dialog.component.scss'],
})
export class ReportInitDialogComponent {
  public form: FormGroup;

  private inputsCount: number;
  private currentData: any;

  public controlConfig: ControlConfigReportInterface;
  public deliveryList: DeliveryInterface[] = [];
  public uniqDebtors: CounterpartyReferenceInterface[] = [];
  public isEmpty: boolean;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
  ) {}

  ngOnInit() {
    this.initValues();
    this.initForm();
  }

  public onSubmit(): void {
    console.log(this.form.value)
    this.ref.close(this.form.value);
  }

  public calculateColumns(currentInput) {
    return this.inputsCount % currentInput;
  }

  private initValues(): void {
    this.currentData = this.config.data;
    this.controlConfig = this.currentData.config;
    console.log(this.currentData);

    this.deliveryService.getDeliveriesWithStats().subscribe(resp => {
      let debtors = resp.map(x => x.Debtor);
      debtors.push({
        Title: 'Все',
        ID: 0
      });
      debtors.reverse();

      this.uniqDebtors = MibArray.getUniqByProperty(debtors, 'Title');
      console.log(this.uniqDebtors)
    })
  }

  private initForm(): void {
    this.form = this.fb.group({});

    // let dateFrom = new Date();
    //TODO: init протокол отчетов .

    if(this.controlConfig.isEmpty) {
      this.isEmpty = true;
    }

    if(this.controlConfig.isDateFrom) {
      this.form.addControl('dateFrom', new FormControl('', Validators.required))
    }

    if(this.controlConfig.isDateTo) {
      this.form.addControl('dateTo', new FormControl('', Validators.required))
    }

    if(this.controlConfig.isDebitor) {
      this.form.addControl('debitor', new FormControl('', Validators.required))
    }

    if(this.controlConfig.isOnDate) {
      this.form.addControl('onDate', new FormControl(Date, Validators.required))
    }

    if(this.controlConfig.isStatusRequest) {
      this.form.addControl('statusRequest', new FormControl('', Validators.required))
    }

    if(this.controlConfig.isDaysDelay) {
      this.form.addControl('daysDelay', new FormControl('', Validators.required))
    }

    if(this.controlConfig.isNumberOrder) {
      this.form.addControl('numberOrder', new FormControl('', Validators.required))
    }

    if(this.controlConfig.isNumberRequest) {
      this.form.addControl('numberRequest', new FormControl('', Validators.required))
    }

    if(this.controlConfig.isSelectReportDropdown) {
      this.form.addControl('selectReportDropdown', new FormControl('', Validators.required))
    }

    if(this.controlConfig.isSelectReportCheckbox) {
      this.form.addControl('selectReportCheckbox', new FormControl('', Validators.required))
    }
  }
}
