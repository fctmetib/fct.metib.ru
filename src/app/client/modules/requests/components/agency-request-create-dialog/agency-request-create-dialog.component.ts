import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { Store } from '@ngrx/store';
import { DeliveryService } from '../../../../../shared/services/share/delivery.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { AgencyShipmentsInterface } from '../../types/common/agency-shipments.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agency-request-create-dialog',
  templateUrl: './agency-request-create-dialog.component.html',
  styleUrls: ['./agency-request-create-dialog.component.scss'],
})
export class AgencyRequestCreateDialogComponent implements OnDestroy {
  form: FormGroup;
  shipmentForm: FormGroup;

  public deliveries: DeliveryInterface[] = [];

  public maxDate = new Date();

  //#region dynamic variables
  public btnSubmitValue = 'Создать';
  //#endregion

  public addDeliveryDialog: boolean;
  public currentShipmentID = null;
  public shipments: AgencyShipmentsInterface[] = [];
  public selectedShipments: ClientShipmentInterface[] = [];

  public currentRequestId: number;
  private subscription$: Subscription = new Subscription();

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    public config: DynamicDialogConfig,
    public store: Store
  ) {}

  ngOnInit() {
    this.initValues();
    this.initializeForm();
  }

  public onSubmit(): void {}

  public deliveryChanged(i) {
  }

  public getRequestByIndx(i): DeliveryInterface {
    let id = this.requests.at(i).value;
    return this.deliveries.find(x => x.ID === id);
  }

  public addRequest(): void {
    this.requests.push(this.fb.control(''));
    let currentIndex = this.requests.controls.length - 1;
    this.shipments.push({
      formId: currentIndex,
      shipmnets: []
    })
  }

  openNew(isEdit: boolean, i: number) {
    this.currentRequestId = i;

    if (isEdit) {
      let shipment = this.selectedShipments[0];

      if (shipment) {
        this.currentShipmentID = shipment.ID;
        this.shipmentForm.patchValue({
          accountNumber: shipment.AccountNumber || '',
          accountDate: new Date(shipment.AccountDate),
          invoiceNumber: shipment.InvoiceNumber,
          invoiceDate: new Date(shipment.InvoiceDate),
          dateShipment: new Date(shipment.DateShipment),
          summ: shipment.Summ,
        });
      } else {
        return;
      }
    }
    this.addDeliveryDialog = true;
  }

  hideDialog() {
    this.addDeliveryDialog = false;
  }

  deleteShipments(i: number) {
    let currentShipments = this.shipments.find(x => x.formId === i).shipmnets;
    this.selectedShipments.forEach((selectedShipment) => {
      this.shipments.splice(currentShipments.indexOf(selectedShipment), 1);
    });
    this.selectedShipments = [];
  }

  addShipment() {
    let currentShipment = this.shipments.find(x => x.formId === this.currentRequestId)

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

    if (this.currentShipmentID) {
      shipment.ID = this.currentShipmentID;
      let shipmentIndex = currentShipment.shipmnets.indexOf(
        currentShipment.shipmnets.find((x) => x.ID === this.currentShipmentID)
      );

      currentShipment.shipmnets[shipmentIndex] = shipment;
      this.currentShipmentID = null;
    } else {
      currentShipment.shipmnets.push(shipment);
    }

    this.shipmentForm.reset();
    this.hideDialog();
  }

  getShipmentsSum(i: number) {
    let items = this.shipments.find(x => x.formId === i)?.shipmnets;
    if(items) {
    return items.reduce((sum, current) =>
      sum + current.Summ, 0
    )
    }
  }

  get requests() {
    return this.form.get('requests') as FormArray;
  }

  private initValues(): void {
    this.subscription$.add(this.deliveryService.getDeliveriesWithStats().subscribe(resp => {
      this.deliveries = resp;
    }));
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      requests: this.fb.array([
        this.fb.control('')
      ])
    });

    this.shipmentForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      accountDate: ['', [Validators.required]],
      invoiceNumber: ['', [Validators.required]],
      invoiceDate: ['', [Validators.required]],
      dateShipment: ['', [Validators.required]],
      summ: [1, [Validators.required]],
    });

    this.shipments.push({
      formId: 0,
      shipmnets: []
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
