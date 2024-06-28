import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, Subscription} from 'rxjs'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {NewDelaysDrawerService} from '../../modules/new-delays-drawer/new-delays-drawer.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {RubPipe} from 'src/app/shared/pipes/rub/rub.pipe'
import {DatePipe} from '@angular/common'
import {MatDialog} from '@angular/material/dialog'
import {NewDelaysPageModalComponent} from 'src/app/shared/modules/modals/new-delays-page-modal/new-delays-page-modal.component'

@Component({
	selector: 'mib-new-delays',
	templateUrl: './new-delays.component.html',
	styleUrls: ['./new-delays.component.scss']
})
export class NewDelaysComponent implements OnInit, OnDestroy {
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
	public ids = {a: '213/324a-22'}
	public todayIs: Date = new Date()
	public mData = [
		{
			ID: 143523,
			Amount: 14369629,
			Date: '2024-06-06T00:00:00',
			Doc: '213/324a-22',
			Payer: {
				INN: '2540167061',
				Date: '2024-07-09T00:00:00',
				Title: 'Общество с ограниченной ответственностью "РИТЕЙЛ"'
			}
		},
		{
			ID: 23423,
			Amount: 30389307,
			Date: '2024-06-14T00:00:00',
			Doc: '213/324a-23',
			Payer: {
				INN: '2540167061',
				Date: '2024-03-06T00:00:00',
				Title: 'Общество с ограниченной ответственностью "РИТЕЙЛ"'
			}
		},
		{
			ID: 33456,
			Amount: 34507,
			Date: '2024-06-06T00:00:00',
			Doc: '213/324a-24',
			Payer: {
				INN: '2540167061',
				Date: '2024-07-06T00:00:00',
				Title: 'Общество с ограниченной ответственностью "РИТЕЙЛ"'
			}
		}
	]

	public isDesktop: boolean = false
	private subscriptions = new Subscription()
	public currentIndex: number = 0
	headers = [
		'Накладная',
		'Дата накладной',
		'Договор поставки',
		'Сумма поставки',
		'Дата платежа',
		'Сумма просрочки',
		'Дата доп'
	]

	public dataMap = {
		0: 'Doc',
		1: 'Date',
		2: {Payer: 'Date'},
		3: 'Amount',
		4: 'Date',
		5: 'Amount',
		6: {Payer: 'Title'}
	}

	public showTotal: boolean = false

	constructor(
		public toolsService: ToolsService,
		private newDelaysDrawerService: NewDelaysDrawerService,
		public breakpointService: BreakpointObserverService,
		private rubPipe: RubPipe,
		private datePipe: DatePipe,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	contractDrawer(deliveryID: number) {
		this.newDelaysDrawerService
			.open({
				data: {deliveryID}
			})
			.afterClosed()
			.pipe
			// filter(Boolean),
			()
			.subscribe()
	}

	getVisibleHeader() {
		this.showTotal = false
		if (this.headers[this.currentIndex] === 'Сумма просрочки') {
			this.showTotal = true
			return this.headers[this.currentIndex]
		}
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
				if (childKey === 'Date' && value !== undefined) {
					value = this.datePipe.transform(value, 'dd.MM.yyyy')
				}
			}
			// Проверка и добавление префиксов
			if (path === 'Amount' && value !== undefined) {
				value = this.rubPipe.transform(value)
			} else if (path === 'Date' && value !== undefined) {
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
		// const dialogConfig = {
		// 	width: '100%',
		// 	maxWidth: '600px',
		// 	height: '100%',
		// 	panelClass: 'modal-cdk',
		// 	data: {duty}
		// }
		const dialogConfig = {
			width: '100%',
			maxWidth: '600px',
			height: 'calc(100% - 48px)',
			position: {
				top: '48px',
				left: '0px'
			},
			panelClass: 'modal-cdk',
			data: {duty}
		}

		this.dialog.open(NewDelaysPageModalComponent, dialogConfig)
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
