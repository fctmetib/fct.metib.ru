import {Component, OnInit, ViewChild} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, Subscription} from 'rxjs'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {AgentRegisterViewDrawerService} from '../modules/agent-register-view-drawer/agent-register-view-drawer.service'
import {AgentRegisterDrawerService} from '../modules/agent-register-drawer/agent-register-drawer.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {RubPipe} from 'src/app/shared/pipes/rub/rub.pipe'
import {DatePipe} from '@angular/common'
import {MatDialog} from '@angular/material/dialog'
import {RegisterAgentPageModalComponent} from 'src/app/shared/modules/modals/register-agent-page-modal/register-agent-page-modal.component'

@Component({
	selector: 'mib-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
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

	public PAGINATOR_ITEMS_PER_PAGE = 10
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public requestsSelection: TableSelectionEvent = {
		selectedCount: 0,
		selectedIds: []
	}

	public isDesktop: boolean = false
	private subscriptions = new Subscription()
	public currentIndex: number = 0

	public regData = [
		{
			ID: 143523,
			Amount: 14369629,
			Buyer: 'ООО "Бизнес"',
			Date: '2024-02-06T00:00:00',
			Contract: '27/02-19',
			Number: 'AR/129',
			FinType: true,
			Status: true,
			Send: true,
			SendDate: '2024-09-18T09:19:26.000Z',
			Finance: true,
			FinDate: '2024-04-18T09:19:26.000Z'
		},
		{
			ID: 144353,
			Amount: 234629,
			Buyer: 'ООО "Бизнес"',
			Date: '2023-02-06T00:00:00',
			Contract: '27/02-19',
			Number: 'AR/131',
			FinType: true,
			Status: false,
			Send: true,
			SendDate: '2024-09-18T09:19:26.000Z',
			Finance: false,
			FinDate: '2023-04-18T09:19:26.000Z'
		},
		{
			ID: 23453,
			Amount: 234629,
			Buyer: 'ООО "Бизнес"',
			Date: '2022-02-06T00:00:00',
			Contract: '27/02-19',
			Number: 'AR/132',
			FinType: true,
			Status: true,
			Send: true,
			SendDate: '2024-09-18T09:19:26.000Z',
			Finance: true,
			FinDate: '2023-04-18T09:19:26.000Z'
		},
		{
			ID: 143456,
			Amount: 1443529,
			Buyer: 'ООО "Бизнес"',
			Date: '2024-04-06T00:00:00',
			Contract: '27/02-19',
			Number: 'AR/130',
			FinType: false,
			Status: true,
			Send: false,
			SendDate: '2024-05-18T09:19:26.000Z',
			Finance: true,
			FinDate: '2024-06-18T09:19:26.000Z'
		},
		{
			ID: 23443453,
			Amount: 53429,
			Buyer: 'ООО "Бизнес"',
			Date: '2023-02-06T00:00:00',
			Contract: '27/02-19',
			Number: 'AR/134',
			FinType: true,
			Status: true,
			Send: true,
			SendDate: '2024-09-18T09:19:26.000Z',
			Finance: true,
			FinDate: '2023-04-18T09:19:26.000Z'
		}
	]

	headers = [
		'Договор',
		'Номер',
		'Дата',
		'Тип',
		'Состояние',
		'Отправлена',
		'Дата отправки',
		'Профинансировано',
		'Дата финансирования',
		'Покупатель',
		'Сумма'
	]

	public dataMap = {
		0: 'Contract',
		1: 'Number',
		2: 'Date',
		3: 'FinType',
		4: 'Status',
		5: 'Send',
		6: 'SendDate',
		7: 'Finance',
		8: 'FinDate',
		9: 'Buyer',
		10: 'Amount'
	}

	constructor(
		public toolsService: ToolsService,
		private agentRegisterViewDrawerService: AgentRegisterViewDrawerService,
		private agentRegisterDrawerService: AgentRegisterDrawerService,
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

	agentRegisterViewsDrawer() {
		this.agentRegisterViewDrawerService.open()
	}

	agentRegisterDrawer() {
		this.agentRegisterDrawerService.open()
	}

	selectionChange(event: TableSelectionEvent) {
		this.requestsSelection = event
	}

	onPageChange(page: number) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE
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
			}
			// Проверка и добавление префиксов
			if (path === 'Amount' && value !== undefined) {
				value = this.rubPipe.transform(value)
			} else if (
				path === 'Date' ||
				path === 'FinDate' ||
				(path === 'SendDate' && value !== undefined)
			) {
				value = this.datePipe.transform(value, 'dd.MM.yyyy')
			} else if (path === 'FinType' && value !== undefined) {
				value = value ? 'С финанс.' : 'Без финанс.'
			} else if (path === 'Status' && value !== undefined) {
				value = value ? 'Исполнена' : 'Действует'
			} else if (path === 'Send' && value !== undefined) {
				value = value ? 'Да' : 'Нет'
			} else if (path === 'Finance' && value !== undefined) {
				value = value ? 'Да' : 'Нет'
			}
			result[newKey] = value
		}
		// console.log('result :>> ', result)
		return result[this.currentIndex]
	}

	openRegisterPageModal(reg) {
		const dialogConfig = {
			width: '100%',
			maxWidth: '600px',
			panelClass: 'custom-dialog-register',
			data: {reg}
		}
		console.log('openRegisterPageModal')
		this.dialog.open(RegisterAgentPageModalComponent, dialogConfig)
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
