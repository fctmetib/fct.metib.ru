import {Component, ViewChild} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'

@Component({
	selector: 'mib-new-delays',
	templateUrl: './new-delays.component.html',
	styleUrls: ['./new-delays.component.scss']
})
export class NewDelaysComponent {
	@ViewChild(TableComponent) table: TableComponent

	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}
	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 16
	public PAGINATOR_PAGE_TO_SHOW = 5

	public currentPage$ = new BehaviorSubject<number>(1)

	public datas: number = 123000
	public ids: string = '213/324a-22'
	public todayIs: Date = new Date()

	constructor(public toolsService: ToolsService) {}

	public openDrawer() {
		console.log('open darwer>>>')
	}
}
