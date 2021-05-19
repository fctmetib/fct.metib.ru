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
import { Component, HostListener } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequestSourceEnum } from 'src/app/shared/types/enums/request-source.enum';
import { FinanceTypeInterface } from '../../types/common/finance-type.interface';
import { Observable, Observer } from 'rxjs';
import {
  addRequestAction,
  setErrorAction,
} from '../../store/actions/crud.action';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { RequestsResponseInterface } from '../../types/requestResponse.interface';
import { ThrowStmt } from '@angular/compiler';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { PasteHandler } from 'src/app/shared/classes/common/past-handler.class';

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
      value: 'NonFinancing',
    },
    {
      name: 'С финансированием',
      value: 'Financing',
    },
  ];
  public freeDuty = 0;

  public shipments: ClientShipmentInterface[] = [];
  public selectedShipments: ClientShipmentInterface[] = [];

  public addDeliveryDialog: boolean;
  public rowDataValidateDialog: boolean;

  public files: FileModeInterface[] = [];
  public uploadedFiles: File[] = [];

  //#region dynamic variables
  public btnSubmitValue = 'Создать';
  //#endregion

  //#region shipment
  public currentShipmentID = null;
  public maxDate = new Date();

  public errorsShipments: number[] = [];
  public lengthShipments: number = 0;
  //#endregion

  public selectedImages: any[] = [];

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
    this.errorsMessage$ = this.store.pipe(select(crudErrorsSelector));
    this.successMessage$ = this.store.pipe(select(crudSuccessSelector));
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      deliveryID: [0, [Validators.required]],
      number: [''],
      type: ['NonFinancing', [Validators.required]],
      date: ['', [Validators.required]],
    });

    this.shipmentForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      accountDate: ['', [Validators.required]],
      invoiceNumber: ['', [Validators.required]],
      invoiceDate: ['', [Validators.required]],
      dateShipment: ['', [Validators.required]],
      summ: [1, [Validators.required]],
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
    if (this.shipments.length > 0) {
      const request: ClientRequestInterface = {
        Date: new Date(this.form.value.date),
        DeliveryID: this.form.value.deliveryID,
        Files: this.files,
        Number: this.form.value.number,
        Shipments: this.shipments,
        Type: this.form.value.type,
      };

      this.store.dispatch(addRequestAction({ request }));
    } else {
      let errors = 'Ошибка! Пожалуйста, добавьте минимум 1 поставку.';
      this.store.dispatch(setErrorAction({ errors }));
      return;
    }
  }

  onDeliveryChange(event): void {
    let delivery: DeliveryInterface = this.deliveries.find(
      (x) => x.ID === event.value
    );
    this.freeDuty = delivery.Statistics.DutyDebtor;
  }

  //#region shipments
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86) {
      let pasteHandler = new PasteHandler();

      if (window['clipboardData']) {
        let value = window['clipboardData'].getData('Text');
        let processedData = pasteHandler.processData(value);
        this.addRowsFromClipboard(processedData);
      } else {
        navigator['clipboard'].readText().then((clipText) => {
          let processedData = pasteHandler.processData(clipText);
          this.addRowsFromClipboard(processedData);
        });
      }
    }
  }

  getShipmentsSum(items: ClientShipmentInterface[]) {
    if(items) {
    return items.reduce((sum, current) =>
      sum + current.Summ, 0
    )
    }
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

  //#endregion

  //#region files
  removeFile(file: FileModeInterface) {
    this.files.splice(this.files.indexOf(this.files.find(x => x === file)), 1);
  }

  onSelect(event, type: string) {
    let files: File[] = event.target.files;;
    this.uploadedFiles = files;

    for (let file of files) {
      let guid = Guid.newGuid();

      this.commonService.getBase64(file).subscribe((res) => {
        this.fileService
          .uploadFileChunks(res, file.name, file.size.toString(), guid)
          .subscribe(
            (res) => {
              this.files.push({
                Code: res.Code,
                FileName: res.FileName,
                ID: res.ID,
                Size: res.Size,
                Identifier: type,
              });
              console.log(this.files);
            },
            (err) => console.log(err)
          );
      });
    }
  }
  //#endregion

  //#region private

  private addRowsFromClipboard(processedData) {
    this.lengthShipments = 0;
    this.errorsShipments = [];

    let isError: boolean = null;
    let currentRowIndex: number = 1;

    let columns = this.getColumns();


    for (const curentDataRow of processedData) {
      const rowData: any = {};
      for (const col of columns) {
        rowData[col.field] = curentDataRow[col.visibleIndex];
      }

      if (this.validateRowData(rowData)) {
        let shipment: ClientShipmentInterface = {
          AccountNumber: rowData.AccountNumber,
          AccountDate: rowData.AccountDate,
          InvoiceNumber: rowData.InvoiceNumber,
          InvoiceDate: rowData.InvoiceDate,
          WaybillNumber: null,
          WaybillDate: null,
          DateShipment: rowData.DateShipment,
          DatePayment: null,
          SummToFactor: null,
          Summ: rowData.Summ,
          ID: Math.floor(Math.random() * 100),
        };

        console.log(shipment);
        this.shipments.push(shipment);
      } else {
        this.errorsShipments.push(currentRowIndex);
        isError = true;
      }
      currentRowIndex++;
    }
    if (isError) {
      this.lengthShipments = processedData.length;
      this.showRowDataValidateMessage();
    }
  }

  private validateRowData(rowData): boolean {
    if (!rowData.AccountDate) return false;

    if (!rowData.AccountNumber) return false;

    if (!rowData.DateShipment) return false;

    if (!rowData.InvoiceDate) return false;

    if (!rowData.InvoiceNumber) return false;

    if (!rowData.Summ) return false;

    return true;
  }

  private showRowDataValidateMessage(): void {
    this.rowDataValidateDialog = true;
  }

  private getColumns() {
    let columns = [
      {
        field: 'InvoiceNumber',
        visibleIndex: 0,
      },
      {
        field: 'InvoiceDate',
        visibleIndex: 1,
      },
      {
        field: 'AccountNumber',
        visibleIndex: 2,
      },
      {
        field: 'AccountDate',
        visibleIndex: 3,
      },
      {
        field: 'Summ',
        visibleIndex: 4,
      },
      {
        field: 'DateShipment',
        visibleIndex: 5,
      },
    ];

    return columns;
  }

  //#endregion
}
