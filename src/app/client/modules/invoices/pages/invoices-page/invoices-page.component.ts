import {Component, OnDestroy, OnInit} from '@angular/core'
import {Properties} from 'csstype'
import {
	BehaviorSubject,
	Subscription,
	finalize,
	merge,
	switchMap,
	tap
} from 'rxjs'
import {InvoicesReq, InvoicesService} from '../../services/invoices.service'
import {ClientInvoice} from '../../interfaces/client.invoice'
import {InvoiceDrawerService} from '../../modules/invoice-drawer/invoice-drawer.service'
import {DatesService} from 'src/app/shared/services/dates.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {FormControl} from '@angular/forms'
import {takeUntil} from 'rxjs/operators'
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {RubPipe} from 'src/app/shared/pipes/rub/rub.pipe'
import {DatePipe} from '@angular/common'
import {MatDialog} from '@angular/material/dialog'
import {InvoicePageModalComponent} from 'src/app/shared/modules/modals/invoice-page-modal/invoice-page-modal.component'

@Component({
	selector: 'mib-invoices-page',
	templateUrl: './invoices-page.component.html',
	styleUrls: ['./invoices-page.component.scss']
})
export class InvoicesPageComponent implements OnInit, OnDestroy {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}
	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 7
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public selectedRequestCount: number = 0
	public severalRequestsChecked: boolean = false

	public invoices: ClientInvoice[] = []
	public invoicesVisible: ClientInvoice[] = []

	public dateFrom = new FormControl<string>('')
	public dateTo = new FormControl<string>('')

	public isDesktop: boolean = false
	private subscriptions = new Subscription()
	public currentIndex: number = 0
	headers = [
		'Сумма',
		'Договор поставки',
		'Назначение',
		'Плательщик',
		'Дебитор',
		'Счет плательщика',
		'Счет получателя'
	]

	public invoiceMap = {
		0: 'Amount',
		1: 'ID',
		2: 'Comment',
		3: {Payer: 'Title'},
		4: {Beneficiary: 'Title'},
		5: {Payer: 'Account'},
		6: {Beneficiary: 'Account'}
	}

	constructor(
		public invoicesService: InvoicesService,
		private invoiceDrawerService: InvoiceDrawerService,
		public datesService: DatesService,
		public toolsService: ToolsService,
		private au: AutoUnsubscribeService,
		public breakpointService: BreakpointObserverService,
		private rubPipe: RubPipe,
		private datePipe: DatePipe,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.watchForms()

		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))

		const {dateFrom, dateTo} = this.datesService.convertDatesInObjectToInput({
			dateFrom: this.toolsService
				.subtractFromDate(new Date(), {days: 7})
				.toISOString(),
			dateTo: new Date().toISOString()
		})
		this.dateFrom.setValue(dateFrom, {emitEvent: false})
		this.dateTo.setValue(dateTo)

		this.loadInvoicesData().subscribe()
	}

	loadInvoicesData() {
		const req: InvoicesReq = {}

		const setOptionalDate = (date: string, key: string) => {
			if (date) req[key] = new Date(date).toISOString()
		}

		setOptionalDate(this.dateFrom.value, 'dateFrom')
		setOptionalDate(this.dateTo.value, 'dateTo')

		this.loading$.next(true)
		return this.invoicesService.getInvoices(req).pipe(
			tap(data => {
				this.invoices = data
			}),
			finalize(() => this.loading$.next(false))
		)
	}

	openDrawer(invoiceId: number) {
		this.invoiceDrawerService.open({
			data: {invoiceId: invoiceId}
		})
	}

	openModal(data) {
		console.log('OPEN MODAL .. YEAH', data)
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

	getVisibleCell(row: ClientInvoice[]) {
		console.log('halo')
		const result = {}
		for (const [newKey, path] of Object.entries(this.invoiceMap)) {
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
			if (path === 'Amount' && value !== undefined) {
				value = this.rubPipe.transform(value)
			} else if (path === 'Date' && value !== undefined) {
				value = this.datePipe.transform(value, 'dd.MM.yyyy')
			}

			result[newKey] = value
		}
		// console.log('result :>> ', result)
		return result[this.currentIndex]
	}

	onPageChange(page: number) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		this.invoicesVisible = this.invoices.slice(startIndex, endIndex)
	}

	private watchForms() {
		merge(this.dateFrom.valueChanges, this.dateTo.valueChanges)
			.pipe(
				switchMap(() => this.loadInvoicesData()),
				tap(() => {
					this.onPageChange(1)
				}),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
	}

	openInvoicePageModal(invoice) {
		const dialogConfig = {
			width: '100%',
			maxWidth: '600px',
			height: '100%',
			panelClass: 'modal-cdk',
			data: {invoice}
		}
		// const dialogConfig = {
		// 	width: '100%',
		// 	maxWidth: '600px',
		// 	height: 'calc(100% - 48px)',
		// 	position: {
		// 		top: '48px',
		// 		left: '0px'
		// 	},
		// 	panelClass: 'modal-cdk',
		// 	data: {invoice}
		// }

		this.dialog.open(InvoicePageModalComponent, dialogConfig)
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
