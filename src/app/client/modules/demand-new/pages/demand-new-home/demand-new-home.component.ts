import {Component, OnInit} from '@angular/core'
import {BehaviorSubject, finalize, tap} from 'rxjs'
import {
	IDraftList,
	IHistoryList,
	IQueryList
} from '../mock-data-service/data.models'
import {DataService} from '../mock-data-service/data.srrvice'
import {AnimationService} from 'src/app/shared/animations/animations.service'
import {Properties} from 'csstype'
import {DemandDrawerService} from '../../modules/demand-drawer/demand-drawer.service'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestRes} from '../../../requests/interfaces/request.interface'

const ANIMATION_CONFIG = {
	translateDistance: '-3%',
	endOpacity: 0,
	startOpacity: 1,
	duration: 300
}

@Component({
	selector: 'mib-demand-new-home',
	templateUrl: './demand-new-home.component.html',
	styleUrls: ['./demand-new-home.component.scss'],
	animations: [new AnimationService().generateAnimation(ANIMATION_CONFIG)]
})
export class DemandNewHomeComponent implements OnInit {
	requestLists: IQueryList[] = []
	drafts: IDraftList[] = []
	draftLists: IDraftList[] = []
	historys: IHistoryList[] = []
	historyLists: IHistoryList[] = []

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
	public currentPage: number = 1

	selectedRequestsCount: number
	severalRequestsChecked: boolean = false

	public requestsAnimationStates: Record<number, boolean> = {}
	public historyAnimationStates: Record<number, boolean> = {}

	constructor(
		private requestList: DataService,
		private demandDrawerService: DemandDrawerService
	) {}

	ngOnInit(): void {
		this.getRequestList()
		this.getDraftList()
		this.getHistoryList()
	}

	getRequestList() {
		return this.requestList
			.getRequestList()
			.subscribe(list => (this.requestLists = list))
	}

	getDraftList() {
		this.loading$.next(true)
		setTimeout(() => {
			this.requestList
				.getDraftList()
				.pipe(
					tap(data => {
						this.drafts = data.map(x => ({...x, checked: false}))
						// Инициализация состояния анимации
						this.drafts.forEach(draft => {
							this.requestsAnimationStates[draft.id] = false
						})
						this.onPageChange(this.currentPage)
					}),
					finalize(() => this.loading$.next(false))
				)
				.subscribe()
		}, 5000)
	}

	getHistoryList() {
		this.loading$.next(true)
		setTimeout(() => {
			this.requestList
				.getHistoryList()
				.pipe(
					tap(data => {
						this.historys = data.map(x => ({...x, checked: false}))
						// Инициализация состояния анимации
						this.historys.forEach(history => {
							this.historyAnimationStates[history.id] = false
						})
						this.onPageChange(this.currentPage)
					}),
					finalize(() => this.loading$.next(false))
				)
				.subscribe()
		}, 5000)
	}

	onPageChange(page: number) {
		this.currentPage = page

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		this.selectedRequestsCount = 0
		this.severalRequestsChecked = false

		this.historyLists = this.historys.slice(startIndex, endIndex)
		this.draftLists = this.drafts.slice(startIndex, endIndex)
	}

	openDrawer() {
		this.demandDrawerService
			.open({state: DrawerStateEnum.CREATE})
			.afterClosed()
			.subscribe()
	}
}
