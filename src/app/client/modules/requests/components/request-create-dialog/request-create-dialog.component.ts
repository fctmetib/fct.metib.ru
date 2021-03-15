import { FileModeInterface } from './../../../../../shared/types/file/file-model.interface';
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
import { Observable, Observer } from 'rxjs';
import { addRequestAction } from '../../store/actions/crud.action';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { RequestsResponseInterface } from '../../types/requestResponse.interface';
import { ThrowStmt } from '@angular/compiler';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';

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
  public selectedShipments: ClientShipmentInterface[] = [];

  public addDeliveryDialog: boolean;

  //#region dynamic variables
  public btnSubmitValue = 'Создать';
  //#endregion

  //#region shipment
  public currentShipmentID = null;
  //#endregion

  uploadedFiles: FileModeInterface[] = [];

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private fileService: FileService,
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
      this.deliveries = resp
        .sort(
          (a, b) => new Date(a.DateTo).getTime() - new Date(b.DateTo).getTime()
        )
        .reverse();

      if (this.config.data) {
        let delivery: DeliveryInterface = this.deliveries.find(
          (x) => x.ID === this.config.data.Delivery.ID
        );
        this.freeDuty = delivery.Statistics.DutyDebtor;
      }
    });

    if (this.config.data) {
      let selectedRow: RequestsResponseInterface = this.config.data;
      console.log(selectedRow);

      if (selectedRow.Shipments) {
        this.shipments = selectedRow.Shipments;
      }

      this.form.patchValue({
        deliveryID: selectedRow.Delivery.ID,
        number: selectedRow.Number,
        type: selectedRow.Type,
        date: selectedRow.Date,
      });

      this.btnSubmitValue = 'Сохранить';
    }
  }

  onSubmit(): void {
    let selectedDelivery = this.deliveries.find(
      (x) => x.ID === this.form.value.deliveryID
    );

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

  close() {
    this.ref.close('Closed');
  }

  //#region shipments
  openNew(isEdit: boolean) {
    if (isEdit) {
      let shipment = this.shipments[0];
      if (shipment) {
        this.currentShipmentID = shipment.ID;
        this.shipmentForm.patchValue({
          accountNumber: shipment.AccountNumber,
          accountDate: shipment.AccountDate,
          invoiceNumber: shipment.InvoiceNumber,
          invoiceDate: shipment.InvoiceDate,
          dateShipment: shipment.DateShipment,
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

  //#endregion

  //#region files
  onSelect(event) {
    console.log(event);
  }

  onUpload(event) {
    console.log(event);
    let files: File[] = event.files;

    for (let file of files) {
      console.log(file);
      let guid = Guid.newGuid();

      this.getBase64(file).subscribe(res => {
        this.fileService
        .uploadFileChunks(res, file.name, file.size.toString(), guid)
        .subscribe(
          (res) => {
            console.log(res);
            this.uploadedFiles.push({
              Code: res.Code,
              FileName: res.FileName,
              ID: res.ID,
              Identifier: res.Identifier,
              Size: res.Size,
            });
          },
          (err) => console.log(err)
        );
      });

    }
  }

  private getBase64(file): Observable<string>{
    return Observable.create((observer: Observer<string>) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        observer.next(e.target.result);
        observer.complete();
      };
      reader.readAsDataURL(file);
    })
  }
  //#endregion
}
