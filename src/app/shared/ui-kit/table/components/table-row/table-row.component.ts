import {
	Component,
	ContentChildren,
	Input,
	OnDestroy,
	OnInit,
	QueryList
} from '@angular/core'
import {DeviceType} from '../../../../interfaces/shared.interface'
import {TableCellComponent} from '../table-cell/table-cell.component'
import {TableRowAnimationService} from '../../services/table-row-animation.service'
import {TableComponent} from '../../table.component'
import {AnimationService} from '../../../../animations/animations.service'
import {ToolsService} from '../../../../services/tools.service'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

export const TABLE_ROW_ANIMATION_CONFIG = {
	translateDistance: '-3%',
	endOpacity: 0,
	startOpacity: 1,
	duration: 300
}

@Component({
	selector: 'mib-table-row',
	templateUrl: './table-row.component.html',
	styleUrls: ['./table-row.component.scss'],
	animations: [
		new AnimationService().generateAnimation(TABLE_ROW_ANIMATION_CONFIG)
	]
})
export class TableRowComponent implements OnInit, OnDestroy {
	@ContentChildren(TableCellComponent) cells: QueryList<TableCellComponent>
	@Input() rowId: number // Уникальный идентификатор для строки
	@Input() rowStatus: string
	@Input() device: DeviceType = 'desktop'
	@Input() underlined: boolean = false

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	id: string = this.toolsService.generateId()

	constructor(
		private tableComponent: TableComponent,
		private tableRowAnimationService: TableRowAnimationService,
		private toolsService: ToolsService,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	get animationState() {
		return this.tableRowAnimationService.getAnimationState(this.rowId)
	}

	get cell(): TableCellComponent | undefined {
		return this.cells.find(cell => cell.showCheckbox)
	}

	selectRow() {
		this.cell?.toggle()
	}

	get state() {
		return Boolean(this.cell?.state)
	}

	openModal() {
		event.stopPropagation()
		console.log('OPEN MODAL')
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
