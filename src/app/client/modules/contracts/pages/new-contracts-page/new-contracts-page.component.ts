import {Component, OnInit, ViewChild} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, tap} from 'rxjs'
import {DeliveryService} from 'src/app/shared/services/share/delivery.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {DeliveryContractsInterface} from 'src/app/shared/types/delivery/delivery-contracts.interface'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'

@Component({
	selector: 'mib-new-contracts-page',
	templateUrl: './new-contracts-page.component.html',
	styleUrls: ['./new-contracts-page.component.scss']
})
export class NewContractsPageComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	@ViewChild(TableComponent) table: TableComponent

	public skeletonWithoutUnderline: Properties = {
		borderRadius: '8px',
		height: '48px',
		width: '100%'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 7
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public isClosedContracts = false
	public addStatistics = false

	public listOfContracts: DeliveryContractsInterface[] = []
	public listOfContractsVisible: DeliveryContractsInterface[] = []

	constructor(
		public toolsService: ToolsService,
		private deliveryService: DeliveryService
	) {}

	ngOnInit(): void {
		this.getAllDeliveriesContracts()
	}

	getAllDeliveriesContracts() {
		this.loading$.next(true)
		this.deliveryService
			.getAllDeliveriesContracts(this.isClosedContracts, this.addStatistics)
			.pipe(
				tap(data => {
					this.listOfContracts = data
					this.onPageChange(this.currentPage$.value)
					console.log('this.listOfContracts :>> ', this.listOfContracts)
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	selectionChange($event) {
		// console.log('selectionChange :>> ')
	}

	onPageChange(page: number) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		this.table.deselect()

		this.listOfContractsVisible = this.listOfContracts.slice(
			startIndex,
			endIndex
		)
	}

	newContractPageDrawer() {
		console.log('contract drawer>>>')
	}
}
