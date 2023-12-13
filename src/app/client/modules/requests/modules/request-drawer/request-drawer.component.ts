import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {AdvancedRequests} from '../../pages/requests-page/interfaces/requests-page.interface'
import {RequestDrawerService} from './request-drawer.service'
import {BehaviorSubject, filter, tap} from 'rxjs'
import {InputSize} from '../../../../../shared/ui-kit/input/interfaces/input.interface';
import {ButtonSize} from '../../../../../shared/ui-kit/button/interfaces/button.interface';
import {DeliveryAgreement, ShipmentReq} from '../delivery-agreement-drawer/interfaces/delivery-agreement.interface';
import {DeliveryAgreementDrawerService} from '../delivery-agreement-drawer/services/delivery-agreement-drawer.service';
import {DeliveryAgreementService} from '../delivery-agreement-drawer/services/delivery-agreement.service';
import {AuthService} from '../../../../../auth/services/auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Document, RequestReq, RequestStatusEnum, RequestTypeEnum} from '../../interfaces/request.interface';
import {takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service';
import {FileDnd} from '../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';

@Component({
  selector: 'mib-request-drawer',
  templateUrl: './request-drawer.component.html',
  styleUrls: ['./request-drawer.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class RequestDrawerComponent implements OnInit {
  public sending$ = new BehaviorSubject<boolean>(false)

  public form: FormGroup

  public size: InputSize | ButtonSize = 'm'
  public deliveries: DeliveryAgreement[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DrawerData<AdvancedRequests[]>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RequestDrawerComponent>,
    private requestsService: RequestDrawerService,
    private deliveryAgreementService: DeliveryAgreementService,
    private deliveryAgreementDrawerService: DeliveryAgreementDrawerService,
    private authService: AuthService,
    private au: AutoUnsubscribeService,
  ) {
  }

  public deliveryIdControl = new FormControl(null, [Validators.required])

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

  ngOnInit() {
    this.initForms()
    this.watchForms()
    this.deliveryAgreementService.getRefs(this.factoring.DebtorID).pipe(
      tap(data => {
        this.deliveries = data;
      })
    ).subscribe()
  }

  openDeliveryAgreement() {
    const drawer = this.deliveryAgreementDrawerService.open({maxWidth: 492})

    drawer.afterClosed().pipe(
      filter(Boolean),
      tap(shipment => {
        this.addShipment(shipment)
      })
    ).subscribe()
  }

  addShipment(shipment: ShipmentReq) {
    const control: FormGroup = this.fb.group({
      AccountNumber: [null, [Validators.required]],
      AccountDate: [null, [Validators.required]],
      InvoiceNumber: [null, [Validators.required]],
      InvoiceDate: [null, [Validators.required]],
      WaybillNumber: [null, [Validators.required]],
      WaybillDate: [null, [Validators.required]],
      DateShipment: [null, [Validators.required]],
      DatePayment: [null, [Validators.required]],
      Summ: [null, [Validators.required]],
      SummToFactor: [null, [Validators.required]],
    })
    control.patchValue(shipment)
    this.shipments.push(control)
  }

  addDocument(data: Document) {
    const control: FormGroup = this.fb.group({
      Number: [null],
      Title: [null],
      Location: [null],
      Description: [null],
      DocumentStatusID: [null],
      DocumentStatus: [null],
      DocumentTypeID: [null],
      DocumentType: [null],
      DocumentTypeTitle: [null],
      Available: [null],
      Removed: [null],
      ActiveOrganizationID: [null],
      ActiveOrganization: [null],
      CreatedTime: [null],
      AuthorOrganizationID: [null],
      AuthorOrganization: [null],
      CreatorLastName: [null],
      CreatorFirstName: [null],
      DocumentID: [null],
      OwnerTypeID: [null],
      OwnerID: [null],
      Data: [null]
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
    // let existRequest: RequestReq = this.config.data;
    //
    // if (this.shipments.length > 0) {
    //
    //   if (existRequest) {
    //     const delivery: DeliveryRef = this.deliveries.find(x => x.ID === this.form.value.deliveryID);
    //
    //     const request: ClientRequestInterface = {
    //       ID: existRequest.ID,
    //       IsCorrected: false,
    //       ReadOnly: false,
    //       Status: null,
    //       Summ: 0,
    //       Date: new Date(this.form.value.date),
    //       Delivery: {
    //         ...delivery
    //       },
    //       Documents: this.files,
    //       Number: this.form.value.number,
    //       Shipments: this.shipments,
    //       Type: this.form.value.type,
    //     };
    //
    //     this.requestService.update(request).pipe(
    //       switchMap((result) => {
    //         if (this.filesToUpload.length > 0) {
    //           const uploadObservables = this.filesToUpload.map(file => {
    //             return this.requestService.uploadDocument(file, result[0], 'Document ');
    //           });
    //           return forkJoin(uploadObservables);
    //         }
    //         return of(result);
    //       }),
    //       tap(() => {
    //         this.ref.close();
    //       })
    //     ).subscribe();
    //   } else {
    //     const delivery: DeliveryRef = this.deliveries.find(x => x.ID === this.form.value.deliveryID);
    //
    //     const request: ClientRequestInterface = {
    //       ID: 0,
    //       IsCorrected: false,
    //       ReadOnly: false,
    //       Status: null,
    //       Summ: 0,
    //       Date: new Date(this.form.value.date),
    //       Delivery: {
    //         ...delivery
    //       },
    //       Documents: this.files,
    //       Number: this.form.value.number,
    //       Shipments: this.shipments,
    //       Type: this.form.value.type,
    //     };
    //
    //     this.requestService.add(request).pipe(
    //       switchMap((result) => {
    //         if (this.filesToUpload.length > 0) {
    //           const uploadObservables = this.filesToUpload.map(file => {
    //             return this.requestService.uploadDocument(file, result[0], 'Document ');
    //           });
    //           return forkJoin(uploadObservables);
    //         }
    //         return of(result);
    //       }),
    //       tap(() => {
    //         this.ref.close();
    //       })
    //     ).subscribe();
    //   }
    // } else {
    //   let errors = 'Ошибка! Пожалуйста, добавьте минимум 1 поставку.';
    //   return;
    // }
  }

  private initForms() {
    let test: RequestReq
    this.form = this.fb.group({
      Number: [null, [Validators.required]],
      Date: [null, [Validators.required]],
      Type: [RequestTypeEnum.NON_FINANCING, [Validators.required]],
      Status: [RequestStatusEnum, [Validators.required]],
      Summ: [null, [Validators.required]],
      ReadOnly: [null, [Validators.required]],
      IsCorrected: [null, [Validators.required]],
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
      takeUntil(this.au.destroyer)
    ).subscribe()
  }

  onDocumentLoad({file, url}: FileDnd) {
    const document: Document = {
      Description: '',
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      OwnerID: this.user.ID,
      Data: url
    };
    this.addDocument(document)
  }
}
