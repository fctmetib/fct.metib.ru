import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {ContractsDrawerData} from './interfaces/contracts-drawer.data'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {BehaviorSubject, finalize, zip, tap} from 'rxjs'
import {Properties} from 'csstype'
import {DeliveryService} from 'src/app/shared/services/share/delivery.service'
import {Delivery} from 'src/app/shared/types/delivery/delivery'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {Shipment} from '../../../requests/modules/shipment-drawer/interfaces/shipment.interface'
import {ContractedFormsEnum} from '../../../../../shared/ui-kit/contracted-forms/interfaces/contracted-forms.interface'
import {WordDownloadService} from '../../../../../shared/services/word-download.service'

@Component({
	selector: 'mib-new-contracts-page-drawer',
	templateUrl: './contracts-drawer.component.html',
	styleUrls: ['./contracts-drawer.component.scss']
})
export class ContractsDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	// public skeletonDefault: Properties = {
	// 	borderRadius: '8px'
	// }

	datas = 123000

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public shipments: Shipment[] = []
	public shipmentsDisplay: Shipment[] = []
	public shipmentsReducedAmount: number = 0
	public freeLimit: number = 0
	public requisites: string = ''
	public size = 'm'

	public delivery
	public ContractedFormsEnum = ContractedFormsEnum

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: DrawerData<ContractsDrawerData>,
		public toolsService: ToolsService,
		public dialogRef: MatDialogRef<ContractsDrawerComponent>,
		private deliveryService: DeliveryService,
		private toaster: ToasterService,
		private wordDownloadService: WordDownloadService
	) {}

	ngOnInit(): void {
		this.getCurrentContract()
	}

	get deliveryId() {
		return this.data.data.deliveryID
	}

	getCurrentContract() {
		this.loading$.next(true)
		zip(
			this.deliveryService.getRequisitesById(this.deliveryId).pipe(
				tap(requisites => {
					this.requisites = requisites
				})
			),
			this.deliveryService.getShipments(this.deliveryId).pipe(
				tap(shipments => {
					this.shipments = shipments
					this.onPageChange(1)
					this.shipmentsReducedAmount = shipments.reduce(
						(acc, n) => acc + n.Summ,
						0
					)
				})
			),
			this.deliveryService
				.getDeliveryById({
					includeStatistics: true,
					ID: this.deliveryId
				})
				.pipe(
					tap(data => {
						this.delivery = data
					})
				)
		)
			.pipe(finalize(() => this.loading$.next(false)))
			.subscribe()
	}

	onPageChange(page: number) {
		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		this.shipmentsDisplay = this.shipments.slice(startIndex, endIndex)
	}

	copyDetails() {
		// this.toaster.show('failure', 'В разработке!', '', true, false, 2500)
		this.wordDownloadService.downloadDocWithText(
			this.requisites,
			`${this.toolsService.concatArray([
				this.delivery.Debtor.Title,
				' - ',
				this.delivery.Customer.Title,
				'реквизиты'
			])}`
		)
	}
}
