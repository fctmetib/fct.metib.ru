import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestDrawerService} from './request-drawer.service'
import {BehaviorSubject, defer, filter, finalize, forkJoin, of, switchMap, tap} from 'rxjs'
import {InputSize} from '../../../../../shared/ui-kit/input/interfaces/input.interface';
import {ButtonSize} from '../../../../../shared/ui-kit/button/interfaces/button.interface';
import {DeliveryAgreement, ShipmentReq} from '../shipment-drawer/interfaces/shipment.interface';
import {ShipmentDrawerService} from '../shipment-drawer/services/shipment-drawer.service';
import {DeliveryService} from '../shipment-drawer/services/delivery.service';
import {AuthService} from '../../../../../auth/services/auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Document, DocumentType, RequestReq, RequestRes, RequestTypeEnum} from '../../interfaces/request.interface';
import {takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service';
import {FileDnd} from '../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';
import {RequestsService} from '../../services/requests.service';
import {FormsPresetsService} from '../../../../../shared/services/forms-presets.service';
import {extractBase64, ToolsService} from '../../../../../shared/services/tools.service';

@Component({
  selector: 'mib-request-drawer',
  templateUrl: './request-drawer.component.html',
  styleUrls: ['./request-drawer.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class RequestDrawerComponent implements OnInit {
  public isSubmitting$ = new BehaviorSubject<boolean>(false)

  public form: FormGroup

  public existingRequest?: RequestRes
  public RequestTypeEnum = RequestTypeEnum

  public size: InputSize | ButtonSize = 'm'
  public deliveries: DeliveryAgreement[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestRes>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RequestDrawerComponent>,
    public requestsService: RequestsService,
    private requestDrawerService: RequestDrawerService,
    private deliveryService: DeliveryService,
    private shipmentDrawerService: ShipmentDrawerService,
    private authService: AuthService,
    private au: AutoUnsubscribeService,
    private formsPresetsService: FormsPresetsService,
    private toolsService: ToolsService
  ) {
  }

  public deliveryIdControl = new FormControl(null, [Validators.required])
  public freeLimitControl = new FormControl(0)

  get shipments() {
    return this.form.get('Shipments') as FormArray
  }

  get documents() {
    return this.form.get('Documents') as FormArray
  }

  get factoring() {
    return this.authService.currentUser$.value.userFactoring
  }

  get user() {
    return this.authService.currentUser$.value.userGeneral
  }

  get delivery(): FormControl<DeliveryAgreement> {
    return this.form.get('Delivery') as FormControl
  }

  get isEditing() {
    return this.data.state === 'edit'
  }

  ngOnInit() {
    this.initForms()
    this.watchForms()

    this.existingRequest = this.data.data
    if (this.existingRequest) this.form.patchValue(this.existingRequest)

    this.deliveryService.getRefs(this.factoring.DebtorID).pipe(
      tap(data => {
        this.deliveries = data;
      })
    ).subscribe()
  }

  openShipment() {
    const drawer = this.shipmentDrawerService.open({maxWidth: 492})

    drawer.afterClosed().pipe(
      filter(Boolean),
      tap(shipment => {
        this.addShipment(shipment)
      })
    ).subscribe()
  }

  addShipment(shipment: ShipmentReq) {
    const control: FormGroup = this.formsPresetsService.shipment(Validators.required, shipment)
    control.patchValue(shipment)
    this.shipments.push(control)
  }

  addDocument(data: Partial<Document>) {
    const control: FormGroup = this.fb.group({
      // Number: [null],
      Title: [null],//
      // Location: [null],
      Description: [null],//
      // DocumentStatusID: [null],
      // DocumentStatus: [null],
      DocumentTypeID: [null],//
      // DocumentType: [null],
      // DocumentTypeTitle: [null],
      // Available: [null],
      // Removed: [null],
      // ActiveOrganizationID: [null],
      // ActiveOrganization: [null],
      // CreatedTime: [null],
      // AuthorOrganizationID: [null],
      // AuthorOrganization: [null],
      // CreatorLastName: [null],
      // CreatorFirstName: [null],
      // DocumentID: [null],
      OwnerTypeID: [null],//
      OwnerID: [null],//
      Data: [null],//
    });
    control.patchValue(data)
    this.documents.push(control)
  }

  removeShipment(idx: number) {
    this.shipments.removeAt(idx)
  }

  removeDocument(idx: number) {
    this.documents.removeAt(idx)
  }

  onSubmit(): void {
    this.isSubmitting$.next(true)

    const {Documents, ...data}: RequestReq = this.form.getRawValue()
    const request: RequestReq = {
      Documents: [],
      ...this.toolsService.transformDatesToISO(data)
    }
    const documents: Document[] = this.documents.value;
    const shipments: ShipmentReq[] = this.shipments.value

    if (shipments.length > 0) {
      defer(() => {
        if (this.isEditing && this.existingRequest) {
          return this.requestsService.update(this.existingRequest.ID, request)
        } else {
          return this.requestsService.create(request)
        }
      }).pipe(
        switchMap(result => {
          if (documents.length > 0) {
            const uploadObservables = documents.map(document => {
              const requestId = result[0]
              const modifiedDocument: Document = {
                ...document,
                OwnerID: requestId
              }
              return this.requestsService.uploadDocument(modifiedDocument, requestId, DocumentType.CUSTOMER_REQUEST_SCAN);
            });
            return forkJoin(uploadObservables);
          }
          return of(result);
        }),
        finalize(() => {
          this.dialogRef.close()
          this.isSubmitting$.next(false)
        })
      ).subscribe()
    } else {
      let errors = 'Ошибка! Пожалуйста, добавьте минимум 1 поставку.';
    }
  }

  private initForms() {
    this.form = this.fb.group({
      Number: [null],
      Date: [null],
      Type: [RequestTypeEnum.NON_FINANCING, [Validators.required]],
      Status: [null],
      Summ: [0, [Validators.required]],
      ReadOnly: [false, [Validators.required]],
      IsCorrected: [false, [Validators.required]],
      Delivery: this.fb.group({
        CurrencyCode: [null, [Validators.required]],
        Title: [null, [Validators.required]],
        CustomerID: [null, [Validators.required]],
        Customer: [null, [Validators.required]],
        DebtorID: [null, [Validators.required]],
        Debtor: [null, [Validators.required]],
        ID: [null, [Validators.required]]
      }),
      Documents: this.fb.array([], [Validators.required]),
      Shipments: this.fb.array([], [Validators.required])
    })
  }

  private watchForms() {
    this.deliveryIdControl.valueChanges.pipe(
      tap(deliveryId => {
        const delivery = this.deliveries.find(x => x.ID === deliveryId)
        this.delivery.setValue(delivery)
      }),
      switchMap(deliveryId => this.deliveryService.getFreeLimit(deliveryId)),
      tap(limit => this.freeLimitControl.setValue(limit)),
      takeUntil(this.au.destroyer)
    ).subscribe()
  }

  onDocumentLoad({file, url}: FileDnd) {
    const document: Partial<Document> = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url)
    };
    this.addDocument(document)
  }
}
