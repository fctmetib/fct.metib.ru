import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Properties} from 'csstype'
import {
	BehaviorSubject,
	filter,
	finalize,
	zip,
	switchMap,
	tap,
	Subscription
} from 'rxjs'
import {DatesService} from 'src/app/shared/services/dates.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {DocumentDrawerService} from '../../modules/document-drawer/document-drawer.service'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DocumentViewDrawerService} from '../../modules/document-view-drawer/document-view-drawer.service'
import {DocumentsService} from '../../services/documents.service'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {DocumentRes} from '../../../requests/interfaces/request.interface'
import {SignService} from 'src/app/shared/services/share/sign.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {DatePipe} from '@angular/common'
import {MatDialog} from '@angular/material/dialog'
import {DocumentsPageFactoringModalComponent} from 'src/app/shared/modules/modals/documents-page-factoring-modal/documents-page-factoring-modal.component'

@Component({
	selector: 'mib-documents-page',
	templateUrl: './documents-page.component.html',
	styleUrls: ['./documents-page.component.scss']
})
export class DocumentsPageComponent implements OnInit, OnDestroy {
	public loading$ = new BehaviorSubject<boolean>(false)
	public isSigning$ = new BehaviorSubject<boolean>(false)

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

	public isDesktop: boolean = false

	private subscriptions = new Subscription()
	public currentIndex: number = 0
	headers = [
		'Имя файла',
		'Описание',
		'Тип документа',
		'Дата создания',
		'Прикрепил'
	]

	public dataMap = {
		0: 'Title',
		1: 'DocumentTypeTitle',
		2: 'Description',
		3: 'CreatedTime',
		4: ['CreatorLastName', 'CreatorFirstName']
	}

	constructor(
		public toolsService: ToolsService,
		public datesService: DatesService,
		public documentDrawerService: DocumentDrawerService,
		public documentViewDrawerService: DocumentViewDrawerService,
		private documentsService: DocumentsService,
		private signService: SignService,
		public breakpointService: BreakpointObserverService,
		private datePipe: DatePipe,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		const {dateFrom, dateTo} = this.datesService.convertDatesInObjectToInput({
			dateFrom: this.toolsService
				.subtractFromDate(new Date(), {days: 14})
				.toISOString(),
			dateTo: new Date().toISOString()
		})

		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))

		this.dateFrom.setValue(dateFrom)
		this.dateTo.setValue(dateTo)
		this.getClientDocumentsList().subscribe()
	}

	getClientDocumentsList() {
		this.loading$.next(true)
		return this.documentsService.fetchDocuments().pipe(
			tap(data => {
				// console.log('data :>> ', data)
				this.clientDocuments = data.sort((a, b) => {
					// Преобразование строковых дат в объекты Date для сравнения
					const dateA = new Date(a.CreatedTime)
					const dateB = new Date(b.CreatedTime)

					// Сравнение дат и возврат результата сортировки
					return dateB.getTime() - dateA.getTime()
				})

				this.onPageChange(this.currentPage$.value)
			}),
			finalize(() => this.loading$.next(false))
		)
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
			.pipe(
				filter(Boolean),
				switchMap(() => this.getClientDocumentsList())
			)
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

	openDocumentsPageModal(doc) {
		const dialogConfig = {
			width: '100%',
			maxWidth: '600px',
			panelClass: 'documents-dialog-factoring',
			data: {doc}
		}

		this.dialog.open(DocumentsPageFactoringModalComponent, dialogConfig)
	}

	onAction() {
		this.isSigning$.next(true)
		const requests$ = this.table.selectedRows.map(row =>
			this.documentsService.sign(row.rowId)
		)
		this.documentsService.signModal(zip(requests$), this.isSigning$).subscribe()
	}

	prev() {
		if (this.currentIndex > 0) {
			this.currentIndex--
		}
	}

	next() {
		if (this.currentIndex < this.headers.length - 1) {
			this.currentIndex++
		}
	}

	getVisibleHeader() {
		return this.headers[this.currentIndex]
	}

	getVisibleCell(doc: any) {
		const result = {}
		for (const [newKey, path] of Object.entries(this.dataMap)) {
			let value
			if (typeof path === 'string') {
				// Если путь - строка, извлекаем значение напрямую
				value = doc[path]
			} else if (typeof path === 'object') {
				// Если путь - объект, извлекаем вложенное значение
				if (path[0] === 'CreatorLastName' && path[1] === 'CreatorFirstName') {
					value = `${doc[path[0]]} ${doc[path[1]]}`
				}
			}
			// Проверка и добавление префиксов
			if (path === 'CreatedTime' && value !== undefined) {
				value = this.datePipe.transform(value, 'dd.MM.yyyy')
			}
			result[newKey] = value
		}
		return result[this.currentIndex]
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
