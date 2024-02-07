import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {NewContractsPageDrawerInterface} from './interfaces/new-contracts-page-drawer.interface'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {BehaviorSubject, finalize, tap} from 'rxjs'
import {Properties} from 'csstype'
import {DeliveryService} from 'src/app/shared/services/share/delivery.service'
import {DeliveryContractsInterface} from 'src/app/shared/types/delivery/delivery-contracts.interface'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

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

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	size = 'm'

	public isClosedContracts = true
	public addStatistics = true

	public contract: DeliveryContractsInterface

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: DrawerData<NewContractsPageDrawerInterface>,
		public toolsService: ToolsService,
		public dialogRef: MatDialogRef<NewContractsPageDrawerComponent>,
		private deliveryService: DeliveryService,
		private toaster: ToasterService
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
					console.log('this.contract w stats :>> ', this.contract)
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	copyDitails() {
		this.toaster.show(
			'success',
			'Реквизиты скопированны!',
			'',
			true,
			false,
			2500
		)
		console.log('Реквизиты нужно сопировать')
	}
}
