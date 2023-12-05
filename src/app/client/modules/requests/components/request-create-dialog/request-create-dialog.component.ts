import { FileModeInterface } from './../../../../../shared/types/file/file-model.interface';
import { DeliveryInterface, DeliveryRef } from './../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../shared/services/share/delivery.service';
import { ClientRequestInterface } from './../../../../../shared/types/client/client-request.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FinanceTypeInterface } from '../../types/common/finance-type.interface';
import { Observable, Subscription, tap } from 'rxjs';
import { ClientShipmentInterface } from 'src/app/shared/types/client/client-shipment.interface';
import { RequestsResponse } from '../../types/requestResponse.interface';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { PasteHandler } from 'src/app/shared/classes/common/past-handler.class';
import { RequestsService } from '../../services/requests.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-request-create-dialog',
  templateUrl: './request-create-dialog.component.html',
  styleUrls: ['./request-create-dialog.component.scss'],
})
export class RequestCreateDialogComponent implements OnInit, OnDestroy {
  errorsMessage$: Observable<string | null>;
  successMessage$: Observable<string | null>;

  form: FormGroup;
  shipmentForm: FormGroup;

  public deliveries: DeliveryRef[] = [];
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

  private subscription$: Subscription = new Subscription();

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private fileService: FileService,
    private deliveryService: DeliveryService,
    public config: DynamicDialogConfig,
    private authService: AuthService,
    private commonService: CommonService,
    private requestService: RequestsService,
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
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

    this.subscription$.add(
      this.deliveryService.getDeliveriesRef(this.authService.currentUser$.value.userFactoring.DebtorID).pipe(
        tap((result) => {
          this.deliveries = result
        })
      ).subscribe()
    );

    if (this.config.data) {
      let selectedRow: RequestsResponse = this.config.data;

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
      const delivery: DeliveryRef = this.deliveries.find(x => x.ID === this.form.value.deliveryID);
      console.log('del', delivery)
      const request: ClientRequestInterface = {
        ID: 0,
        IsCorrected: false,
        ReadOnly: false,
        Status: null,
        Summ: 0,
        Date: new Date(this.form.value.date),
        Delivery: {
          ...delivery
        },
        Documents: this.files,
        Number: this.form.value.number,
        Shipments: this.shipments,
        Type: this.form.value.type,
      };
      console.log('request', request)
      this.requestService.add(request).pipe(
        tap(() => {
          this.ref.close();
        })
      ).subscribe();
    } else {
      let errors = 'Ошибка! Пожалуйста, добавьте минимум 1 поставку.';
      return;
    }
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
    if (items) {
      return items.reduce((sum, current) => sum + current.Summ, 0);
    }
  }

  openNew(isEdit: boolean) {
    if (isEdit) {
      let shipment = this.selectedShipments[0];

      if (shipment) {
        this.currentShipmentID = shipment.ID;
        this.shipmentForm.patchValue({
          accountNumber: shipment.AccountNumber || null,
          accountDate: shipment.AccountDate || null,
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
      ID: Math.floor(Math.random() * 100),
      DateShipment: this.shipmentForm.value.dateShipment,
      InvoiceDate: this.shipmentForm.value.invoiceDate,
      WaybillDate: this.shipmentForm.value.accountDate,
      WaybillNumber: this.shipmentForm.value.accountNumber,
      InvoiceNumber: this.shipmentForm.value.invoiceNumber,
      Summ: this.shipmentForm.value.summ,
      // SummToFactor: 0,
      // AccountNumber: null,
      // AccountDate: null,
      // DatePayment: null,
    };

    console.log(shipment)
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
  removeFile() {
    this.selectedImages.forEach((i) => {
      this.files.splice(this.files.indexOf(this.files.find((x) => x === i)), 1);
    });

    this.selectedImages = [];
  }

  onSelect(event, type: string) {
    let files: File[] = event.target.files;
    this.uploadedFiles = files;

    for (let file of files) {
      let guid = Guid.newGuid();

      this.subscription$.add(
        this.commonService.getBase64(file).subscribe((res) => {
          this.fileService
            .uploadFileChunks(res, file.name, file.size.toString(), guid)
            .subscribe(
              (res: any) => {
                switch(res.type) {
                  // загружается
                  case 1:
                    // const progressResult = Math.round((100 * res.loaded) / res.total)
                    // this.fileUploadProgress = {
                    //  progress: progressResult,
                    //  type
                    // }
                    break;
                  // получил результат
                  case 4:
                     this.files.push({
                       Code: res.body.Code,
                       FileName: res.body.FileName,
                       ID: res.body.ID,
                       Size: res.body.Size,
                       Identifier: type,
                     });
                    break;
                }
              },
              (err) => console.log(err)
            );
        })
      );
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
