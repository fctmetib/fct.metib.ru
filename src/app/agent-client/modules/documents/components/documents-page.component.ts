import {Component, ViewChild} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {AgentDocumentDrawerService} from '../modules/agent-document-drawer/agent-document-drawer.service'
import {AgentDocumentViewDrawerService} from '../modules/agent-document-view-drawer/agent-document-view-drawer.service'

@Component({
	selector: 'mib-documents-page',
	templateUrl: './documents-page.component.html',
	styleUrls: ['./documents-page.component.scss']
})
export class DocumentsPageComponent {
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

	constructor(
		public toolsService: ToolsService,
		private agentDocumentDrawerService: AgentDocumentDrawerService,
		private agentDocumentViewDrawerService: AgentDocumentViewDrawerService
	) {}

	agentDocumentViewsDrawer() {
		this.agentDocumentViewDrawerService.open()
	}

	agentNewDocumentDrawer() {
		this.agentDocumentDrawerService.open()
	}

	selectionChange(event: TableSelectionEvent) {
		this.requestsSelection = event
	}

	onPageChange(page: number) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE
	}
}
