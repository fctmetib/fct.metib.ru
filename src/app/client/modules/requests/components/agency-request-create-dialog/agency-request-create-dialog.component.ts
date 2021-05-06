import { DeliveryInterface } from './../../../../../shared/types/delivery/delivery.interface';
import { Store } from '@ngrx/store';
import { DeliveryService } from '../../../../../shared/services/share/delivery.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileService } from 'src/app/shared/services/common/file.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';

@Component({
  selector: 'app-agency-request-create-dialog',
  templateUrl: './agency-request-create-dialog.component.html',
  styleUrls: ['./agency-request-create-dialog.component.scss'],
})
export class AgencyRequestCreateDialogComponent {
  form: FormGroup;
  shipmentForm: FormGroup;

  public deliveries: DeliveryInterface[] = [];

  public maxDate = new Date();

  //#region dynamic variables
  public btnSubmitValue = 'Создать';
  //#endregion

  public addDeliveryDialog: boolean;
  public currentShipmentID = null;
  public shipments: ClientShipmentInterface[] = [];
  public selectedShipments: ClientShipmentInterface[] = [];

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private fileService: FileService,
    private deliveryService: DeliveryService,
    public config: DynamicDialogConfig,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    public store: Store
  ) {}

  ngOnInit() {
    this.initValues();
    this.initializeForm();
  }

  public onSubmit(): void {}

  public deliveryChanged(i) {
    console.log(this.requests.at(i).value);
  }

  public getRequestByIndx(i): DeliveryInterface {
    let id = this.requests.at(i).value;
    return this.deliveries.find(x => x.ID === id);
  }

  public addRequest(): void {
    this.requests.push(this.fb.control(''));
  }


  openNew(isEdit: boolean) {
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

  deleteShipments() {
    this.selectedShipments.forEach((selectedShipment) => {
      this.shipments.splice(this.shipments.indexOf(selectedShipment), 1);
    });
    this.selectedShipments = [];
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

    if (this.currentShipmentID) {
      shipment.ID = this.currentShipmentID;
      let shipmentIndex = this.shipments.indexOf(
        this.shipments.find((x) => x.ID === this.currentShipmentID)
      );
      this.shipments[shipmentIndex] = shipment;
      this.currentShipmentID = null;
    } else {
      this.shipments.push(shipment);
    }

    this.shipmentForm.reset();
    this.hideDialog();
  }

  getShipmentsSum(items: ClientShipmentInterface[]) {
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
    this.deliveryService.getDeliveriesWithStats().subscribe(resp => {
      this.deliveries = resp;
    })
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      requests: this.fb.array([
        this.fb.control('')
      ])
    });
  }
}
