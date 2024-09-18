import {FormControl} from '@angular/forms'
import {
	filter,
	switchMap,
	tap,
	BehaviorSubject,
	finalize,
	forkJoin,
	merge,
	zip,
	Subscription
} from 'rxjs'
import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core'
import {Duty} from 'src/app/shared/types/duty/duty'
import {FreeDutyRequestDrawerService} from '../../modules/free-duty-request-drawer/free-duty-request-drawer.service'
import {takeUntil} from 'rxjs/operators'
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service'
import {DrawerStateEnum} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {FreeDutyService} from '../../services/free-duty.service'
import {ToolsService} from '../../../../../shared/services/tools.service'
import {Properties} from 'csstype'
import {TableDataService} from '../../../../../shared/ui-kit/table/services/table.service'
import {DataCount} from '../../../../../shared/interfaces/shared.interface'
import {TableRowAnimationService} from '../../../../../shared/ui-kit/table/services/table-row-animation.service'
import {TableSelectionEvent} from '../../../../../shared/ui-kit/table/interfaces/table.interface'
import {TableComponent} from '../../../../../shared/ui-kit/table/table.component'
import {DatesService} from 'src/app/shared/services/dates.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {RubPipe} from 'src/app/shared/pipes/rub/rub.pipe'
import {DatePipe} from '@angular/common'
import {MatDialog} from '@angular/material/dialog'
import {FreeDutyPageModalComponent} from 'src/app/shared/modules/modals/free-duty-page-modal/free-duty-page-modal.component'

@Component({
	selector: 'app-free-duty-page',
	templateUrl: './free-duty-page.component.html',
	styleUrls: ['./free-duty-page.component.scss'],
	providers: [AutoUnsubscribeService]
})
export class FreeDutyPageComponent implements OnInit, OnDestroy {
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

	public control: FormControl = new FormControl<any>(2)

	public PAGINATOR_ITEMS_PER_PAGE = 16
	public PAGINATOR_PAGE_TO_SHOW = 5

	public currentPage$ = new BehaviorSubject<number>(1)

	public dutiesCount?: DataCount
	public duties$ = new BehaviorSubject<Duty[]>([])
	public dutiesSelection: TableSelectionEvent = {
		selectedCount: 0,
		selectedIds: []
	}

	public freeOnly: boolean = true
	public dateFrom = new FormControl<string>('')
	public dateTo = new FormControl<string>('')

	public isDesktop: boolean = false
	private subscriptions = new Subscription()
	public currentIndex: number = 0
	headers = [
		'Контракт',
		'Дебитор',
		'№ поставки',
		'Дата отгрузки',
		'Дата поставки',
		'С/ф №',
		'С/ф дата',
		'Статус',
		'Сумма поставки',
		'Остаток задолженности',
		'Внешняя ссылка'
	]

	public dataMap = {
		0: {Contract: 'ID'},
		1: {Contract: 'Counterparty'},
		2: 'Number',
		3: 'Date',
		4: 'DateContract',
		5: 'NumberInvoice',
		6: 'DateInvoice',
		7: {Statistics: 'Comment'},
		8: 'Summ',
		9: 'Rest',
		10: 'RefNum'
	}

	constructor(
		private au: AutoUnsubscribeService,
		private freeDutyService: FreeDutyService,
		public toolsService: ToolsService,
		private tableDataService: TableDataService,
		private freeDutyRequestDrawerService: FreeDutyRequestDrawerService,
		private tableRowAnimationService: TableRowAnimationService,
		public datesService: DatesService,
		public breakpointService: BreakpointObserverService,
		private rubPipe: RubPipe,
		private datePipe: DatePipe,
		private dialog: MatDialog
	) {}

	get selectedDuties() {
		return this.duties$.value.filter(duty =>
			this.dutiesSelection.selectedIds.includes(duty.ID)
		)
	}

	selectTab(freeOnly: boolean) {
		this.freeOnly = freeOnly
		this.onPageChange(1)
	}

	ngOnInit() {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))

		const {dateFrom, dateTo} = this.datesService.convertDatesInObjectToInput({
			dateFrom: this.toolsService
				.subtractFromDate(new Date(), {months: 1})
				.toISOString(),
			dateTo: new Date().toISOString()
		})
		this.dateFrom.setValue(dateFrom)
		this.dateTo.setValue(dateTo)
		this.currentPage$
			.pipe(
				switchMap(() => {
					this.loading$.next(true)
					const req = {
						freeOnly: this.freeOnly,
						rowsOnPage: this.PAGINATOR_ITEMS_PER_PAGE,
						offSet: this.currentPage$.value
					}

					const setOptionalDate = (date: string, key: string) => {
						if (date) req[key] = new Date(date).toISOString()
					}

					setOptionalDate(this.dateFrom.value, 'dateFrom')
					setOptionalDate(this.dateTo.value, 'dateTo')

					return zip(
						this.freeDutyService
							.getFreeDuties(req)
							.pipe(tap(duties => this.duties$.next(duties))),
						this.freeDutyService
							.getFreeDutyCount(req)
							.pipe(tap(data => (this.dutiesCount = data)))
							.pipe(finalize(() => this.loading$.next(false)))
					)
				}),
				takeUntil(this.au.destroyer)
			)
			.subscribe()

		this.watchForms()
	}

	openDrawer() {
		this.freeDutyRequestDrawerService
			.open({
				state: DrawerStateEnum.CREATE,
				data: this.selectedDuties
			})
			.afterClosed()
			.pipe(
				filter(Boolean),
				tap(() => {
					forkJoin(
						this.selectedDuties.map(duty =>
							this.tableRowAnimationService
								.animateRowAndAwaitCompletion(duty.ID)
								.pipe(
									tap(() => {
										this.removeDutyById(duty.ID)
									})
								)
						)
					)
						.pipe(finalize(() => this.onPageChange(this.currentPage$.value)))
						.subscribe()
				})
			)
			.subscribe()
	}

	removeDutyById(id: number) {
		this.duties$.next(this.duties$.value.filter(duty => duty.ID !== id))
	}

	onPageChange(page: number) {
		this.currentPage$.next(page)
		this.table.deselect()
	}

	public onSort(ascending: boolean, key: string) {
		this.duties$.next(
			this.tableDataService.sortData(this.duties$.value, ascending, key)
		)
	}

	public onSortByDates(ascending: boolean, key: string) {
		this.duties$.next(
			this.tableDataService.sortDataByDate(this.duties$.value, ascending, key)
		)
	}

	private watchForms() {
		merge(this.dateFrom.valueChanges, this.dateTo.valueChanges)
			.pipe(
				tap(() => {
					this.onPageChange(1)
				}),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
	}

	onSelectionChanged(event: TableSelectionEvent) {
		this.dutiesSelection = event
	}

	getVisibleHeader() {
		return this.headers[this.currentIndex]
	}

	getVisibleCell(row: any) {
		const result = {}
		for (const [newKey, path] of Object.entries(this.dataMap)) {
			let value

			if (typeof path === 'string') {
				// Если путь - строка, извлекаем значение напрямую
				value = row[path]
			} else if (typeof path === 'object') {
				// Если путь - объект, извлекаем вложенное значение
				const [parentKey, childKey] = Object.entries(path)[0]
				value = row[parentKey] ? row[parentKey][childKey] : undefined
			}
			// Проверка и добавление префиксов
			if (path === 'Summ' || (path === 'Rest' && value !== undefined)) {
				value = this.rubPipe.transform(value)
			} else if (
				path === 'Date' ||
				path === 'DateContract' ||
				(path === 'DateInvoice' && value !== undefined)
			) {
				value = this.datePipe.transform(value, 'dd.MM.yyyy')
			}

			result[newKey] = value
		}
		return result[this.currentIndex]
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

	openInvoicePageModal(duty) {
		const dialogConfig = {
			width: '100%',
			maxWidth: '600px',
			panelClass: 'custom-dialog-freeduty',
			data: {duty}
		}

		this.dialog.open(FreeDutyPageModalComponent, dialogConfig)
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
