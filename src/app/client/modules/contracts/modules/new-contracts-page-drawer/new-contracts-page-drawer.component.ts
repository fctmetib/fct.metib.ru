import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {NewContractsPageDrawerInterface} from './interfaces/new-contracts-page-drawer.interface'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {BehaviorSubject, finalize, tap} from 'rxjs'
import {Properties} from 'csstype'
import {DeliveryService} from 'src/app/shared/services/share/delivery.service'
import {DeliveryContractsInterface} from 'src/app/shared/types/delivery/delivery-contracts.interface'

@Component({
	selector: 'mib-new-contracts-page-drawer',
	templateUrl: './new-contracts-page-drawer.component.html',
	styleUrls: ['./new-contracts-page-drawer.component.scss']
})
export class NewContractsPageDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		borderRadius: '8px',
		height: '48px',
		width: '100%'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public skeletonTitle: Properties = {
		...this.skeletonWithoutUnderline,
		height: '60px'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	size = 'm'

	// contract = {
	// 	Title: 'test title',
	// 	Number: 8213,
	// 	CreatedTime: '2022-07-30T00:00:00'
	// }

	public isClosedContracts = false
	public addStatistics = true

	public contract: DeliveryContractsInterface

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: DrawerData<NewContractsPageDrawerInterface>,
		public toolsService: ToolsService,
		public dialogRef: MatDialogRef<NewContractsPageDrawerComponent>,
		private deliveryService: DeliveryService
	) {}

	ngOnInit(): void {
		this.getCurrentContract()
	}

	get documentId() {
		return this.data.data.contractID
	}

	getCurrentContract() {
		this.loading$.next(true)
		this.deliveryService
			.getAllDeliveriesContracts(this.isClosedContracts, this.addStatistics)
			.pipe(
				tap(data => {
					this.contract = data.find(d => d.ID === this.documentId)
					console.log('this.contract :>> ', this.contract)
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}
}
