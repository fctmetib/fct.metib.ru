import {Component, OnInit} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'
import {DeliveryService} from 'src/app/shared/services/share/delivery.service'
import {ToolsService} from 'src/app/shared/services/tools.service'

@Component({
	selector: 'mib-new-contracts-page',
	templateUrl: './new-contracts-page.component.html',
	styleUrls: ['./new-contracts-page.component.scss']
})
export class NewContractsPageComponent implements OnInit {
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

	public PAGINATOR_ITEMS_PER_PAGE = 10
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public isClosedContracts = false
	public addStatistics = false

	constructor(
		public toolsService: ToolsService,
		private deliveryService: DeliveryService
	) {}

	ngOnInit(): void {
		this.getAllDeliveriesContracts()
	}

	getAllDeliveriesContracts() {
		this.deliveryService
			.getAllDeliveriesContracts(this.isClosedContracts, this.addStatistics)
			.subscribe({
				next: data => {
					console.log('data :>> ', data)
				}
			})
	}

	selectionChange($event) {
		console.log('$event :>> ', $event)
	}

	onPageChange($event) {
		console.log('$event :>> ', $event)
	}

	newContractPageDrawer() {
		console.log('contract drawer>>>')
	}
}
