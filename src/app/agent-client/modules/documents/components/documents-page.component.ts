import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Properties} from 'csstype'
import {BehaviorSubject, Subscription} from 'rxjs'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {AgentDocumentDrawerService} from '../modules/agent-document-drawer/agent-document-drawer.service'
import {AgentDocumentViewDrawerService} from '../modules/agent-document-view-drawer/agent-document-view-drawer.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'mib-documents-page',
	templateUrl: './documents-page.component.html',
	styleUrls: ['./documents-page.component.scss']
})
export class DocumentsPageComponent implements OnInit, OnDestroy {
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

	public PAGINATOR_ITEMS_PER_PAGE = 10
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public requestsSelection: TableSelectionEvent = {
		selectedCount: 0,
		selectedIds: []
	}

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(
		public toolsService: ToolsService,
		private agentDocumentDrawerService: AgentDocumentDrawerService,
		private agentDocumentViewDrawerService: AgentDocumentViewDrawerService,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	agentDocumentViewsDrawer() {
		this.agentDocumentViewDrawerService.open()
	}

	agentNewDocumentDrawer() {
		this.agentDocumentDrawerService.open()
	}

	selectionChange(event: TableSelectionEvent) {
		this.requestsSelection = event
	}

	openDocumentsPageModal() {
		console.log('open docs page modal>>>>')
	}

	onPageChange(page: number) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
