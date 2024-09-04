import {Component, ViewChild} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {AgentContractsDrawerService} from '../modules/agent-contracts-drawer/agent-contracts-drawer.service'

@Component({
	selector: 'mib-contracts-page',
	templateUrl: './contracts-page.component.html',
	styleUrls: ['./contracts-page.component.scss']
})
export class ContractsPageComponent {
	public loading$ = new BehaviorSubject<boolean>(false)

	@ViewChild(TableComponent) table: TableComponent

	public skeletonWithoutUnderline: Properties = {
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

	public requestsSelection: TableSelectionEvent = {
		selectedCount: 0,
		selectedIds: []
	}

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	currentContractsVisible = [
		{
			ID: 38230,
			Number: '01-3250/08-2022 (Compromise 165к.д.)',
			DateFrom: '2022-07-30T00:00:00',
			DateTo: '2025-07-29T23:59:00',
			Tariff: {
				Identifier: 'T_CompromisWithCA',
				Title: 'Compromise'
			},
			Customer: {
				ID: 1050,
				OrganizationID: 44110,
				INN: '7704742940',
				Title: 'ДРИВИКС ООО'
			},
			Debtor: {
				ID: 105,
				OrganizationID: 105,
				INN: '7707548740',
				Title: 'МВМ'
			},
			Delay: {
				Count: 165,
				Day: 0,
				Work: false,
				Min: 20,
				Max: 45
			},
			Statistics: {
				Count: 1,
				DutyDebtor: 0,
				DutyCustomer: 0,
				DelayDuty: 0,
				FreeLimit: 0
			},
			AdvancedContract: false
		},
		{
			ID: 38231,
			Number: '01-3250/08-2022  Premium (150)',
			DateFrom: '2022-07-30T00:00:00',
			DateTo: '2025-07-29T23:59:00',
			Tariff: {
				Identifier: 'T_Premium',
				Title: 'Premium'
			},
			Customer: {
				ID: 1050,
				OrganizationID: 44110,
				INN: '7704742940',
				Title: 'ДРИВИКС ООО'
			},
			Debtor: {
				ID: 105,
				OrganizationID: 105,
				INN: '7707548740',
				Title: 'МВМ'
			},
			Delay: {
				Count: 150,
				Day: 0,
				Work: false,
				Min: 15,
				Max: 15
			},
			Statistics: {
				Count: 1,
				DutyDebtor: 0,
				DutyCustomer: 0,
				DelayDuty: 0,
				FreeLimit: 0
			},
			AdvancedContract: false
		}
	]

	completedContractsVisible = this.currentContractsVisible
	advancedContractsVisible = this.completedContractsVisible

	constructor(
		public toolsService: ToolsService,
		public agentContractsDrawerService: AgentContractsDrawerService,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	selectionChange(event: TableSelectionEvent) {
		this.requestsSelection = event
	}

	onPageChange<T>(page: number, sourceArray: T[] = []) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		return (sourceArray || []).slice(startIndex, endIndex)
	}

	contractDrawer(id) {
		this.agentContractsDrawerService.open({
			data: {id}
		})
	}

	onCurrentPageChange($event) {
		console.log('$event :>> ', $event)
	}

	onCompletedPageChange($event) {
		console.log('$event :>> ', $event)
	}

	onAdvancedPageChange($event) {
		console.log('$event :>> ', $event)
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
