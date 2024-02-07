import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Shipment} from '../../../../client/modules/requests/modules/shipment-drawer/interfaces/shipment.interface'
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms'
import {catchError, startWith, takeUntil} from 'rxjs/operators'
import {BehaviorSubject, finalize, of, tap} from 'rxjs'
import {AutoUnsubscribeService} from '../../../services/auto-unsubscribe.service'
import {RequestsService} from '../../../../client/modules/requests/services/requests.service'
import {RequestBrowserDrawerService} from '../../../../client/modules/requests/modules/request-browser-drawer/request-browser-drawer.service'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-request-correction-modal',
	templateUrl: './request-correction-modal.component.html',
	styleUrls: ['./request-correction-modal.component.scss'],
	providers: [AutoUnsubscribeService]
})
export class RequestCorrectionModalComponent implements OnInit {
	private shipmentsCorrections: FormArray

	public isSubmitting$ = new BehaviorSubject<boolean>(false)

	public totalSum: number = 0
	public totalSumToFactor: number = 0

	public currentPage: number = 1
	public PAGINATOR_PAGE_TO_SHOW = 5
	public paginatorItemsPerPageControl = new FormControl(5)

	public displayShipments: Shipment[] = []

	get PAGINATOR_ITEMS_PER_PAGE() {
		return this.paginatorItemsPerPageControl.value
	}

	constructor(
		public dialogRef: MatDialogRef<RequestCorrectionModalComponent>,
		private au: AutoUnsubscribeService,
		private fb: FormBuilder,
		private requestsService: RequestsService,
		private requestBrowserDrawerService: RequestBrowserDrawerService,
		@Inject(MAT_DIALOG_DATA) public shipments: Shipment[],
		private toaster: ToasterService
	) {}

	ngOnInit() {
		this.initForms()

		this.totalSum = this.shipments.reduce(
			(sum, current) => sum + current.Summ,
			0
		)

		this.shipmentsCorrections.valueChanges
			.pipe(
				startWith(null),
				tap(() => this.calculateSums()),
				takeUntil(this.au.destroyer)
			)
			.subscribe()

		this.paginatorItemsPerPageControl.valueChanges
			.pipe(
				startWith(null),
				tap(() => this.onPageChange(this.currentPage)),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
	}

	onPageChange(page: number) {
		this.currentPage = page

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		this.displayShipments = this.shipments.slice(startIndex, endIndex)
	}

	send() {
		this.isSubmitting$.next(true)
		this.requestsService
			.correction({
				ID: this.requestBrowserDrawerService.request.ID,
				Date: new Date().toISOString(),
				ShipmentsCorrections: this.shipmentsCorrections.getRawValue()
			})
			.pipe(
				tap(() => {
					this.toaster.show(
						'success',
						'Заявка скорректирована!',
						'',
						true,
						false,
						3000
					)
					this.dialogRef.close(true)
				}),
				finalize(() => {
					this.isSubmitting$.next(false)
				})
			)
			.pipe(
				catchError(err => {
					console.log('Что-то пошло не так!')
					this.toaster.show(
						'failure',
						'Что-то пошло не так!',
						'',
						true,
						false,
						3000
					)
					return of(err)
				})
			)
			.subscribe()
	}

	private calculateSums() {
		this.totalSumToFactor = this.shipmentsCorrections.controls.reduce(
			(sum, current) => sum + current.get('Amount').value,
			0
		)
	}

	private initForms() {
		this.shipmentsCorrections = this.fb.array([])
		for (const shipment of this.shipments) this.addShipmentCorrection(shipment)
	}

	private addShipmentCorrection(shipment: Shipment) {
		const form = this.fb.group({
			ShipmentID: [shipment.ID, Validators.required],
			Amount: [shipment.SummToFactor, Validators.required]
		})

		this.shipmentsCorrections.push(form)
	}

	get correctionForms() {
		return this.shipmentsCorrections.controls as FormGroup[]
	}
}
