import { Store } from '@ngrx/store';
import { DeliveryInterface } from '../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from '../../../../../shared/services/share/delivery.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileService } from 'src/app/shared/services/common/file.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-agency-request-create-dialog',
  templateUrl: './agency-request-create-dialog.component.html',
  styleUrls: ['./agency-request-create-dialog.component.scss'],
})
export class AgencyRequestCreateDialogComponent {
  form: FormGroup;
  shipmentForm: FormGroup;

  public deliveries: DeliveryInterface[] = [];

  //#region dynamic variables
  public btnSubmitValue = 'Создать';
  //#endregion

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private fileService: FileService,
    private deliveryService: DeliveryService,
    public config: DynamicDialogConfig,
    private commonService: CommonService,
    public store: Store
  ) {}

  ngOnInit() {
    this.initValues();
    this.initializeForm();
  }

  public onSubmit(): void {}

  private initValues(): void {
    this.deliveryService.getDeliveriesWithStats().subscribe(resp => {
      this.deliveries = resp;
    })
  }

  private initializeForm(): void {}
}
