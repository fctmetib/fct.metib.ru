import {Component, ViewChild} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {AgentContractsDrawerService} from '../modules/agent-contracts-drawer/agent-contracts-drawer.service'
import {RubPipe} from 'src/app/shared/pipes/rub/rub.pipe'
import {DatePipe} from '@angular/common'
import {MatDialog} from '@angular/material/dialog'
import {ContractsAgentPageModalComponent} from 'src/app/shared/modules/modals/contracts-agent-page-modal/contracts-agent-page-modal.component'

@Component({
	selector: 'mib-contracts-page',
	templateUrl: './contracts-page.component.html',
	styleUrls: ['./contracts-page.component.scss']
})
export class ContractsPageComponent {
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

	public PAGINATOR_ITEMS_PER_PAGE = 7
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public requestsSelection: TableSelectionEvent = {
		selectedCount: 0,
		selectedIds: []
	}

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	public cData = [
		{
			ID: 382546,
			Number: 'ПД18-05-45',
			DateFrom: '2022-02-30T00:00:00',
			DateTo: '2025-07-29T23:59:00',
			Tariff: {
				Title: 'Compromise'
			},
			Creditor: {
				Title: 'ООО “Бизнес”'
			},
			Statistics: {
				FreeLimit: 100654600
			}
		},
		{
			ID: 45630,
			Number: 'ПД18-03-13',
			DateFrom: '2022-04-30T00:00:00',
			DateTo: '2025-06-29T23:59:00',
			Tariff: {
				Title: 'Premium'
			},
			Creditor: {
				Title: 'ООО “МДМ”'
			},
			Statistics: {
				FreeLimit: 1000000
			}
		},
		{
			ID: 38230,
			Number: 'ПД38-234.3',
			DateFrom: '2022-07-30T00:00:00',
			DateTo: '2025-07-29T23:59:00',
			Tariff: {
				Title: 'Premium'
			},
			Creditor: {
				Title: 'ООО “Бизнес”'
			},
			Statistics: {
				FreeLimit: 56000000
			}
		},
		{
			ID: 38230,
			Number: 'ПД19-34-23',
			DateFrom: '2022-06-30T00:00:00',
			DateTo: '2025-04-29T23:59:00',
			Tariff: {
				Title: 'Premium'
			},
			Creditor: {
				Title: 'ООО “Траст”'
			},
			Statistics: {
				FreeLimit: 70000
			}
		},
		{
			ID: 38230,
			Number: 'ПДл234-23',
			DateFrom: '2022-07-30T00:00:00',
			DateTo: '2025-02-29T23:59:00',
			Tariff: {
				Title: 'Compromise'
			},
			Creditor: {
				Title: 'ООО “Бизнес”'
			},
			Statistics: {
				FreeLimit: 105460000
			}
		},
		{
			ID: 38230,
			Number: 'ПД13-234-у3',
			DateFrom: '2022-03-30T00:00:00',
			DateTo: '2025-04-29T23:59:00',
			Tariff: {
				Title: 'Premium'
			},
			Creditor: {
				Title: 'ООО “Бизнес”'
			},
			Statistics: {
				FreeLimit: 3400000
			}
		}
	]

	headers = ['Кредитор', 'Вступил в силу', 'Действует до', 'Лимит']

	public dataMap = {
		0: {Creditor: 'Title'},
		1: 'DateFrom',
		2: 'DateTo',
		3: {Statistics: 'FreeLimit'}
	}

	completedContractsVisible = this.cData
	advancedContractsVisible = this.completedContractsVisible
	public currentIndex: number = 0

	constructor(
		public toolsService: ToolsService,
		public agentContractsDrawerService: AgentContractsDrawerService,
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

	selectionChange(event: TableSelectionEvent) {
		this.requestsSelection = event
	}

	onPageChange<T>(page: number, sourceArray: T[] = []) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		return (sourceArray || []).slice(startIndex, endIndex)
	}

	contractDrawer(id) {
		this.agentContractsDrawerService.open({
			data: {id}
		})
	}

	onCurrentPageChange($event) {
		console.log('$event :>> ', $event)
	}

	onCompletedPageChange($event) {
		console.log('$event :>> ', $event)
	}

	onAdvancedPageChange($event) {
		console.log('$event :>> ', $event)
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

	getVisibleCell(row) {
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
				if (childKey === 'FreeLimit') {
					value = this.rubPipe.transform(row[parentKey][childKey])
				}
			}
			// Проверка и добавление префиксов
			if (path === 'DateFrom' || (path === 'DateTo' && value !== undefined)) {
				value = this.datePipe.transform(value, 'dd.MM.yyyy')
			}
			result[newKey] = value
		}
		// console.log('result :>> ', result)
		return result[this.currentIndex]
	}

	openContractsAgentModal(c) {
		const dialogConfig = {
			width: '100%',
			maxWidth: '600px',
			panelClass: 'custom-contracts-agent',
			data: {c}
		}
		console.log('openRegisterPageModal')
		this.dialog.open(ContractsAgentPageModalComponent, dialogConfig)
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
