import {Component, HostListener, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestDrawerService} from './request-drawer.service'
import {
	BehaviorSubject,
	defer,
	filter,
	finalize,
	forkJoin,
	of,
	switchMap,
	tap
} from 'rxjs'
import {InputSize} from '../../../../../shared/ui-kit/input/interfaces/input.interface'
import {ButtonSize} from '../../../../../shared/ui-kit/button/interfaces/button.interface'
import {
	DeliveryAgreement,
	ShipmentReq
} from '../shipment-drawer/interfaces/shipment.interface'
import {ShipmentDrawerService} from '../shipment-drawer/services/shipment-drawer.service'
import {DeliveryService} from '../shipment-drawer/services/delivery.service'
import {DeliveryService as DeliveryServiceDocs} from 'src/app/shared/services/share/delivery.service'
import {AuthService} from '../../../../../auth/services/auth.service'
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms'
import {
	DocumentReq,
	DocumentRes,
	DocumentType,
	RequestReq,
	RequestRes,
	RequestTypeEnum
} from '../../interfaces/request.interface'
import {takeUntil} from 'rxjs/operators'
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service'
import {FileDnd} from '../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {RequestsService} from '../../services/requests.service'
import {FormsPresetsService} from '../../../../../shared/services/forms-presets.service'
import {
	extractBase64,
	ToolsService
} from '../../../../../shared/services/tools.service'
import {Drawer} from '../../../../../shared/ui-kit/drawer/drawer.class'
import {DatesService} from '../../../../../shared/services/dates.service'
import {PasteModalService} from '../../../../../shared/modules/modals/paste-modal/paste-modal.service'
import {
	ClipboardParserHeaders,
	ClipboardParserService
} from '../../../../../shared/services/clipboard-parser.service'
import {Properties} from 'csstype'
import {Delivery} from 'src/app/shared/types/delivery/delivery'

@Component({
	selector: 'mib-request-drawer',
	templateUrl: './request-drawer.component.html',
	styleUrls: ['./request-drawer.component.scss'],
	providers: [AutoUnsubscribeService]
})
export class RequestDrawerComponent extends Drawer implements OnInit {
	public isSubmitting$ = new BehaviorSubject<boolean>(false)

	public loading$ = new BehaviorSubject<boolean>(false)

	public form: FormGroup

	public existingRequest?: RequestRes
	public RequestTypeEnum = RequestTypeEnum

	public size: InputSize | ButtonSize = 'm'
	public deliveryDocs = []
	public deliveries: DeliveryAgreement[] = []

	public headersMap: ClipboardParserHeaders<ShipmentReq> = [
		['Накладная', 'WaybillNumber', String],
		['Дата накладной', 'WaybillDate', Date],
		['С/ф №', 'InvoiceNumber', Number],
		['Дата с/ф', 'InvoiceDate', Date],
		['Дата поставки', 'DateShipment', Date],
		['Сумма', 'Summ', Number]
	]

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestRes>,
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<RequestDrawerComponent>,
		public requestsService: RequestsService,
		private requestDrawerService: RequestDrawerService,
		private deliveryServiceDocs: DeliveryServiceDocs,
		private deliveryService: DeliveryService,
		private shipmentDrawerService: ShipmentDrawerService,
		private authService: AuthService,
		private au: AutoUnsubscribeService,
		private formsPresetsService: FormsPresetsService,
		private datesService: DatesService,
		private toolsService: ToolsService,
		private pasteModalService: PasteModalService,
		private clipboardParserService: ClipboardParserService
	) {
		super(data)
	}

	public deliveryIdControl = new FormControl(null, [Validators.required])
	public freeLimitControl = new FormControl(0)

	get currentDate() {
		return new Date().toISOString().split('T')[0]
	}

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
		this.loading$.next(true), this.initForms()
		this.watchForms()
		this.requestsService
			.getNextFreeRequestNumber()
			.pipe(
				tap(data => {
					this.form.get('Number').setValue(data)
				})
			)
			.subscribe()

		this.existingRequest = this.data.data
		if (this.existingRequest) {
			this.deliveryIdControl.setValue(this.existingRequest?.Delivery?.ID)
			this.form.patchValue(
				this.datesService.convertDatesInObjectToInput(this.existingRequest)
			)
			this.existingRequest?.Shipments?.forEach(shipment =>
				this.addShipment(shipment)
			)
			this.existingRequest?.Documents?.forEach(document =>
				this.addDocument(document)
			)
		}

		this.deliveryServiceDocs
			.getAllDeliveriesContracts({getAll: true, includeStatistics: false})
			.pipe(
				tap(data => {
					this.deliveryDocs = data.map(el => {
						return {ID: el.ID, Title: el.Number}
					})
				}),
				finalize(() => {
					this.loading$.next(false)
				})
			)
			.subscribe()
	}

	openShipment() {
		const drawer = this.shipmentDrawerService.open({maxWidth: 492})

		this.shipmentDrawerService.shipment$
			.pipe(tap(this.addShipment), takeUntil(drawer.afterClosed()))
			.subscribe()
	}

	addShipment = (shipment: ShipmentReq) => {
		const control: FormGroup = this.formsPresetsService.shipment(
			Validators.required,
			shipment
		)
		control.patchValue(shipment)
		this.shipments.push(control)
	}

	addDocument(data: Partial<DocumentRes>) {
		const control: FormGroup = this.fb.group({
			// Number: [null],
			Title: [null], //
			// Location: [null],
			Description: [null], //
			// DocumentStatusID: [null],
			// DocumentStatus: [null],
			DocumentTypeID: [null], //
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
			OwnerTypeID: [null], //
			OwnerID: [null], //
			Data: [null] //
		})
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
		const documents: DocumentRes[] = this.documents.value
		const shipments: ShipmentReq[] = this.shipments.value

		if (shipments.length > 0) {
			defer(() => {
				if (this.isEditing && this.existingRequest) {
					const {Documents, ...data} = request
					return this.requestsService.update(this.existingRequest.ID, data)
				} else {
					return this.requestsService.create(request).pipe(
						switchMap(result => {
							if (documents.length > 0) {
								const uploadObservables = documents.map(document => {
									const requestId = result[0]
									const modifiedDocument: DocumentRes = {
										...document,
										OwnerID: requestId
									}
									return this.requestsService.uploadDocument(
										modifiedDocument,
										requestId,
										DocumentType.CUSTOMER_REQUEST_SCAN
									)
								})
								return forkJoin(uploadObservables)
							}
							return of(result)
						})
					)
				}
			})
				.pipe(
					finalize(() => {
						this.dialogRef.close()
						this.isSubmitting$.next(false)
					})
				)
				.subscribe()
		} else {
			let errors = 'Ошибка! Пожалуйста, добавьте минимум 1 поставку.'
		}
	}

	private initForms() {
		this.form = this.fb.group({
			Number: [null],
			Date: [this.currentDate],
			Type: [RequestTypeEnum.FINANCING, [Validators.required]],
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
		this.deliveryIdControl.valueChanges
			.pipe(
				tap(deliveryId => {
					const delivery = this.deliveries.find(x => x.ID === deliveryId)
					if (delivery) {
						this.delivery.setValue(delivery)
					} else {
						this.delivery.reset()
						this.freeLimitControl.setValue(0)
					}
				}),
				filter(Boolean),
				switchMap(deliveryId => this.deliveryService.getFreeLimit(deliveryId)),
				tap(limit => this.freeLimitControl.setValue(limit)),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
	}

	onDocumentLoad({file, url}: FileDnd) {
		const document: DocumentReq = {
			Description: `description ${file.name}`,
			DocumentTypeID: 40,
			Title: file.name,
			OwnerTypeID: 20,
			Data: extractBase64(url)
		}
		this.addDocument(document)
	}

	openClipboard() {
		this.pasteModalService
			.open({
				headersMap: this.headersMap
			})
			.afterClosed()
			.pipe(
				filter(Boolean),
				tap(shipments => {
					shipments.forEach(this.addShipment)
				})
			)
			.subscribe()
	}

	parseShipmentClipboard() {
		const clipboardData = navigator.clipboard.readText()
		clipboardData
			.then(data => {
				const parsedData: ShipmentReq[] =
					this.clipboardParserService.parseClipboardData<ShipmentReq>(
						data,
						this.headersMap
					)
				parsedData.forEach(this.addShipment)
			})
			.catch(error => {
				console.error(
					'Произошла ошибка при чтении данных из буфера обмена:',
					error
				)
			})
	}
}
