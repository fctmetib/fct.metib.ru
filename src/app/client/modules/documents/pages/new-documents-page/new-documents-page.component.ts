import {Component, OnInit, ViewChild} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Properties} from 'csstype'
import {BehaviorSubject, filter, finalize, switchMap, tap} from 'rxjs'
import {DatesService} from 'src/app/shared/services/dates.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {DocumentDrawerService} from '../../modules/document-drawer/document-drawer.service'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DocumentViewDrawerService} from '../../modules/document-view-drawer/document-view-drawer.service'
import {DocumentsService} from '../../services/documents.service'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {DocumentRes} from '../../../requests/interfaces/request.interface';

@Component({
	selector: 'mib-new-documents-page',
	templateUrl: './new-documents-page.component.html',
	styleUrls: ['./new-documents-page.component.scss']
})
export class NewDocumentsPageComponent implements OnInit {
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

	public requestsSelection: TableSelectionEvent = {
		selectedCount: 0,
		selectedIds: []
	}

	public PAGINATOR_ITEMS_PER_PAGE = 10
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public dateFrom: FormControl = new FormControl<string>('')
	public dateTo: FormControl = new FormControl<string>('')

	// public clientDocuments: Document[] = []
	public clientDocuments: DocumentRes[] = []
	public clientDocumentsVisible: DocumentRes[] = []

	requests: any
	requestsVisible: any

	constructor(
		public toolsService: ToolsService,
		public datesService: DatesService,
		public documentDrawerService: DocumentDrawerService,
		public documentViewDrawerService: DocumentViewDrawerService,
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
					this.onPageChange(this.currentPage$.value)
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	onPageChange(page: number) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		this.table.deselect()

		this.clientDocumentsVisible = this.clientDocuments.slice(
			startIndex,
			endIndex
		)
	}

	newDocumentDrawer() {
		this.documentDrawerService
			.open({state: DrawerStateEnum.CREATE})
			.afterClosed()
			.pipe
			// filter(Boolean),
			// switchMap(() => this.loadRequestsData())
			()
			.subscribe()
	}

	newDocumentViewsDrawer(documentID: number) {
		this.documentViewDrawerService
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
