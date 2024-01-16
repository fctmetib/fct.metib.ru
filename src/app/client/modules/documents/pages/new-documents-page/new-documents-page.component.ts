import {Component, OnInit} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Properties} from 'csstype'
import {BehaviorSubject, filter, finalize, switchMap, tap} from 'rxjs'
import {DatesService} from 'src/app/shared/services/dates.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {NewDocumentsPageDrawerService} from '../../modules/new-documents-page-drawer/new-documents-page-drawer.service'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {NewDocumentsViewsDrawerService} from '../../modules/new-documents-views-drawer/new-documents-views-drawer.service'
import {DocumentsService} from '../../services/documents.service'
import {ClientDocumentsInterface} from '../../types/common/client-documents.interface'

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

	// public clientDocuments: Document[] = []
	public clientDocuments: ClientDocumentsInterface[] = []

	constructor(
		public toolsService: ToolsService,
		public datesService: DatesService,
		public newDocumentsPageDrawerService: NewDocumentsPageDrawerService,
		public newDocumentsViewsDrawerService: NewDocumentsViewsDrawerService,
		private documentsService: DocumentsService
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
		this.getClientDocumentsList()
	}

	getClientDocumentsList() {
		this.loading$.next(true)
		this.documentsService
			.fetchDocuments()
			.pipe(
				tap(data => {
					this.clientDocuments = data
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	newDocumentPageDrawer() {
		this.newDocumentsPageDrawerService
			.open({state: DrawerStateEnum.CREATE})
			.afterClosed()
			.pipe
			// filter(Boolean),
			// switchMap(() => this.loadRequestsData())
			()
			.subscribe()
	}

	newDocumentViewsDrawer(documentID: number) {
		this.newDocumentsViewsDrawerService
			.open({
				data: {
					documentID: documentID
				}
			})
			.afterClosed()
			.pipe
			// filter(Boolean),
			// switchMap(async () => this.getClientDocumentsList())
			()
			.subscribe()
	}

	selectionChange(event: TableSelectionEvent) {
		this.requestsSelection = event
	}
}
