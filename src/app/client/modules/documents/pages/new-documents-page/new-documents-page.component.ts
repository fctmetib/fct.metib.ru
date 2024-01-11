import {Component, OnInit} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'
import {DatesService} from 'src/app/shared/services/dates.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'

@Component({
	selector: 'mib-new-documents-page',
	templateUrl: './new-documents-page.component.html',
	styleUrls: ['./new-documents-page.component.scss']
})
export class NewDocumentsPageComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}
	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public requestsSelection: TableSelectionEvent = {
		selectedCount: 0,
		selectedIds: []
	}

	public PAGINATOR_ITEMS_PER_PAGE = 16
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public dateFrom: FormControl = new FormControl<string>('')
	public dateTo: FormControl = new FormControl<string>('')

	constructor(
		public toolsService: ToolsService,
		public datesService: DatesService
	) {}

	ngOnInit() {
		const {dateFrom, dateTo} = this.datesService.convertDatesInObjectToInput({
			dateFrom: this.toolsService
				.subtractFromDate(new Date(), {days: 14})
				.toISOString(),
			dateTo: new Date().toISOString()
		})
		console.log(dateTo, dateFrom)
		this.dateFrom.setValue(dateFrom)
		this.dateTo.setValue(dateTo)
	}

	selectionChange(event: TableSelectionEvent) {
		this.requestsSelection = event
	}
}
