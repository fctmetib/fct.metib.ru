import {
  crudErrorsSelector,
  crudSuccessSelector,
} from './../../store/selectors';
import { select, Store } from '@ngrx/store';
import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { ClientRequestInterface } from './../../../../../shared/types/client/client-request.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequestSourceEnum } from 'src/app/shared/types/enums/request-source.enum';
import { FinanceTypeInterface } from '../../types/common/finance-type.interface';
import { Observable } from 'rxjs';
import { addRequestAction } from '../../store/actions/crud.action';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';

@Component({
  selector: 'app-request-create-dialog',
  templateUrl: './request-create-dialog.component.html',
  styleUrls: ['./request-create-dialog.component.scss'],
})
export class RequestCreateDialogComponent {
  errorsMessage$: Observable<string | null>;
  successMessage$: Observable<string | null>;

  form: FormGroup;
  shipmentForm: FormGroup;

  public deliveries: DeliveryInterface[] = [];
  public types: FinanceTypeInterface[] = [
    {
      name: 'Без финансирования',
      value: 0,
    },
    {
      name: 'С финансированием',
      value: 1,
    },
  ];
  public freeDuty = 0;
  public shipments: ClientShipmentInterface[] = [];

  addDeliveryDialog: boolean;

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    public config: DynamicDialogConfig,
    public store: Store
  ) {}

  ngOnInit() {
    this.errorsMessage$ = this.store.pipe(select(crudErrorsSelector));
    this.successMessage$ = this.store.pipe(select(crudSuccessSelector));

    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      deliveryID: [0, [Validators.required]],
      number: ['', [Validators.required]],
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

    this.shipmentForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      accountDate: ['', [Validators.required]],
      invoiceNumber: ['', [Validators.required]],
      invoiceDate: ['', [Validators.required]],
      dateShipment: ['', [Validators.required]],
      summ: [0, [Validators.required]],
    });

    this.deliveryService.getDeliveriesWithStats().subscribe((resp) => {
      this.deliveries = resp.filter((x) => x.DateTo).reverse();
    });
  }

  onSubmit(): void {
    let selectedDelivery = this.deliveries.find(x => x.ID === this.form.value.deliveryID);

    const request: ClientRequestInterface = {
      AgencyFlag: false,
      Date: this.form.value.date,
      DeliveryID: this.form.value.deliveryID,
      Files: [],
      Number: this.form.value.number,
      Shipments: this.shipments,
      Source: RequestSourceEnum.Cabinet,
      Title: selectedDelivery.Title,
      Type: this.form.value.type,
    };

    this.store.dispatch(addRequestAction({ request }));
  }

  onDeliveryChange(event): void {
    console.log(event.value);
    let delivery: DeliveryInterface = this.deliveries.find(
      (x) => x.ID === event.value
    );
    this.freeDuty = delivery.Statistics.DutyDebtor;
  }

  openNew() {
    this.addDeliveryDialog = true;
  }

  hideDialog() {
    this.addDeliveryDialog = false;
  }

  close() {
    this.ref.close('Closed');
  }

  addShipment() {
    let shipment: ClientShipmentInterface = {
      AccountNumber: this.shipmentForm.value.accountNumber,
      AccountDate: this.shipmentForm.value.accountDate,
      InvoiceNumber: this.shipmentForm.value.invoiceNumber,
      InvoiceDate: this.shipmentForm.value.invoiceDate,
      WaybillNumber: null,
      WaybillDate: null,
      DateShipment: this.shipmentForm.value.dateShipment,
      DatePayment: null,
      SummToFactor: null,
      Summ: this.shipmentForm.value.summ,
      ID: Math.floor(Math.random() * 100),
    };

    this.shipments.push(shipment);
    console.log(this.shipments)

    this.shipmentForm.reset();
    this.hideDialog();
  }
}
