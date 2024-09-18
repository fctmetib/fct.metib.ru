import {DatePipe} from '@angular/common'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl} from '@angular/forms'
import {MatDialog} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {BehaviorSubject, Subscription} from 'rxjs'
import {PaymentsPageModalComponent} from 'src/app/shared/modules/modals/payments-page-modal/payments-page-modal.component'
import {RubPipe} from 'src/app/shared/pipes/rub/rub.pipe'
import {AutoUnsubscribeService} from 'src/app/shared/services/auto-unsubscribe.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {DatesService} from 'src/app/shared/services/dates.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {AgentPaymentsDrawerService} from '../modules/agent-payments-drawer/agent-payments-drawer.service'

@Component({
	selector: 'mib-payments-page',
	templateUrl: './payments-page.component.html',
	styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent implements OnInit, OnDestroy {
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
		public datesService: DatesService,
		public toolsService: ToolsService,
		private au: AutoUnsubscribeService,
		public breakpointService: BreakpointObserverService,
		private rubPipe: RubPipe,
		private datePipe: DatePipe,
		private dialog: MatDialog,
		private agentPaymentsDrawerService: AgentPaymentsDrawerService
	) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
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

	// getVisibleCell(row: ClientInvoice[]) {
	// 	const result = {}
	// 	for (const [newKey, path] of Object.entries(this.invoiceMap)) {
	// 		let value

	// 		if (typeof path === 'string') {
	// 			// Если путь - строка, извлекаем значение напрямую
	// 			value = row[path]
	// 		} else if (typeof path === 'object') {
	// 			// Если путь - объект, извлекаем вложенное значение
	// 			const [parentKey, childKey] = Object.entries(path)[0]
	// 			value = row[parentKey] ? row[parentKey][childKey] : undefined
	// 		}
	// 		// Проверка и добавление префиксов
	// 		if (path === 'Amount' && value !== undefined) {
	// 			value = this.rubPipe.transform(value)
	// 		} else if (path === 'Date' && value !== undefined) {
	// 			value = this.datePipe.transform(value, 'dd.MM.yyyy')
	// 		}

	// 		result[newKey] = value
	// 	}
	// 	// console.log('result :>> ', result)
	// 	return result[this.currentIndex]
	// }

	onPageChange(page: number) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		// this.invoicesVisible = this.invoices.slice(startIndex, endIndex)
	}

	openPaymentsModal(data) {
		const dialogConfig = {
			width: '100%',
			maxWidth: '600px',
			panelClass: 'custom-dialog-invoice',
			data: {data}
		}

		this.dialog.open(PaymentsPageModalComponent, dialogConfig)
	}

	openDrawer() {
		this.agentPaymentsDrawerService.open()
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
