import {Component, ViewChild} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {AgentRegisterViewDrawerService} from '../modules/agent-register-view-drawer/agent-register-view-drawer.service'
import {AgentRegisterDrawerService} from '../modules/agent-register-drawer/agent-register-drawer.service'

@Component({
	selector: 'mib-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
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
		private agentRegisterViewDrawerService: AgentRegisterViewDrawerService,
		private agentRegisterDrawerService: AgentRegisterDrawerService
	) {}

	agentRegisterViewsDrawer() {
		this.agentRegisterViewDrawerService.open()
	}

	agentRegisterDrawer() {
		this.agentRegisterDrawerService.open()
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
