import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
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
  public isEmpty: boolean;

  constructor(
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    public store: Store
  ) {}

  ngOnInit() {
    this.initValues();
    this.initForm();
  }

  public onSubmit(): void {
    console.log(this.form.value)
  }

  public calculateColumns(currentInput) {
    return this.inputsCount % currentInput;
  }

  private initValues(): void {
    this.currentData = this.config.data;
    this.controlConfig = this.currentData.config;
    console.log(this.currentData);

    this.deliveryService.getDeliveriesWithStats().subscribe(resp => {
      this.deliveryList = resp;
    })
  }

  private initForm(): void {
    this.form = this.fb.group({});

    if(this.controlConfig.isEmpty) {
      this.isEmpty = true;
    }

    if(this.controlConfig.isDateFrom) {
      this.form.addControl('dateFrom', new FormControl(Date, Validators.required))
    }

    if(this.controlConfig.isDateTo) {
      this.form.addControl('dateTo', new FormControl(Date, Validators.required))
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