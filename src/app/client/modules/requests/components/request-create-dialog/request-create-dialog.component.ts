import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { ClientRequestInterface } from './../../../../../shared/types/client/client-request.interface';
import { RequestsService } from './../../services/requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { RequestTypeEnum } from 'src/app/shared/types/enums/request-type.enum';
import { RequestSourceEnum } from 'src/app/shared/types/enums/request-source.enum';

@Component({
  selector: 'app-request-create-dialog',
  templateUrl: './request-create-dialog.component.html',
  styleUrls: ['./request-create-dialog.component.scss'],
})
export class RequestCreateDialogComponent {
  form: FormGroup;

  public deliveries: DeliveryInterface[] = [];
  public types: [] = [];
  public freeDuty = 0;

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private service: RequestsService,
    public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      deliveryID: [0, [Validators.required]],
      number: ['', [Validators.required]],
      type: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });

    this.deliveryService.getDeliveriesWithStats().subscribe(resp => {
      this.deliveries = resp;
    })
  }

  onSubmit(): void {
    const request: ClientRequestInterface = {
      AgencyFlag: false,
      Date: new Date,
      DeliveryID: 1,
      Files: [],
      Number: '',
      Shipments: [],
      Source: RequestSourceEnum.Cabinet,
      Title: '',
      Type: RequestTypeEnum.Correction
    };

    this.service.add(request);
  }

  onDeliveryChange(event): void {
    console.log(event.value);
    let delivery: DeliveryInterface = this.deliveries.find(x => x.ID === event.value);
    this.freeDuty = delivery.Statistics.DutyDebtor;
  }

  close() {
      this.ref.close('Closed');
  }
}
