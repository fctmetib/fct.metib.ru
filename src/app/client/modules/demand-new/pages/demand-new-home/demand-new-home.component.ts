import {Component, OnDestroy, OnInit} from '@angular/core'
import {BehaviorSubject, Subscription, finalize, tap} from 'rxjs'
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
import {DemandSignatureDrawerService} from '../../modules/demand-signature-drawer/demand-signature-drawer.service'
import {DemandSuretyDrawerService} from '../../modules/demand-surety-drawer/demand-surety-drawer.service'
import {DemandEditingDrawerService} from '../../modules/demand-editing-drawer/demand-editing-drawer.service'
import {DemandLimitDrawerService} from '../../modules/demand-limit-drawer/demand-limit-drawer.service'
import {DemandDebtorDrawerService} from '../../modules/demand-debtor-drawer/demand-debtor-drawer.service'
import {DemandVerificationDrawerService} from '../../modules/demand-verification-drawer/demand-verification-drawer.service'
import {DemandFactoringDrawerService} from '../../modules/demand-factoring-drawer/demand-factoring-drawer.service'
import {DemandAgentDrawerService} from '../../modules/demand-agent-drawer/demand-agent-drawer.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

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
export class DemandNewHomeComponent implements OnInit, OnDestroy {
	requestLists: IQueryList[] = []
	drafts: IDraftList[] = []
	draftLists: IDraftList[] = []
	historys: IHistoryList[] = []
	historyLists: IHistoryList[] = []

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	public isNewClient: boolean = true

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

	selectedRequestsCount: number
	severalRequestsChecked: boolean = false

	public requestsAnimationStates: Record<number, boolean> = {}
	public historyAnimationStates: Record<number, boolean> = {}

	constructor(
		private requestList: DataService,
		private demandDrawerService: DemandDrawerService,
		private demandSignatureDrawerService: DemandSignatureDrawerService,
		private demandSuretyDrawerService: DemandSuretyDrawerService,
		private demandEditingDrawerService: DemandEditingDrawerService,
		private demandLimitDrawerService: DemandLimitDrawerService,
		private demandDebtorDrawerService: DemandDebtorDrawerService,
		private demandVerificationDrawerService: DemandVerificationDrawerService,
		private demandFactoringDrawerService: DemandFactoringDrawerService,
		private demandAgentDrawerService: DemandAgentDrawerService,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit(): void {
		this.getAllRequestesList()
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	getAllRequestesList() {
		this.getRequestList()
		this.getDraftList()
		this.getHistoryList()
	}

	getRequestList() {
		this.requestList
			.getRequestList()
			.pipe(
				tap(data => {
					this.requestLists = data
				})
			)
			.subscribe()
	}

	getDraftList() {
		this.loading$.next(true)
		setTimeout(() => {
			this.requestList
				.getDraftList()
				.pipe(
					tap(data => {
						this.drafts = data
						this.onDraftListChange(1)
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
						this.historys = data
						this.onHistoryListChange(1)
					}),
					finalize(() => this.loading$.next(false))
				)
				.subscribe()
		}, 5000)
	}

	onPageChange<T>(page: number, sourceArray: T[] = []) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		return (sourceArray || []).slice(startIndex, endIndex)
	}

	onDraftListChange($event) {
		this.draftLists = this.onPageChange($event, this.drafts)
	}

	onHistoryListChange($event) {
		this.historyLists = this.onPageChange($event, this.historys)
	}

	openDrawer() {
		this.demandDrawerService
			.open({state: DrawerStateEnum.CREATE})
			.afterClosed()
			.subscribe()
	}

	openDrawers(id: number) {
		switch (id) {
			case 1:
				this.demandSignatureDrawerService
					.open({data: {id}})
					// .open({state: DrawerStateEnum.CREATE})
					.afterClosed()
					.subscribe()
				break
			case 2:
				this.demandSuretyDrawerService
					.open({data: {id}})
					// .open({state: DrawerStateEnum.CREATE})
					.afterClosed()
					.subscribe()
				break
			case 3:
				this.demandEditingDrawerService
					.open({data: {id}})
					// .open({state: DrawerStateEnum.CREATE})
					.afterClosed()
					.subscribe()
				break
			case 4:
				this.demandLimitDrawerService
					.open({data: {id}})
					// .open({state: DrawerStateEnum.CREATE})
					.afterClosed()
					.subscribe()
				break
			case 5:
				this.demandDebtorDrawerService
					.open({data: {id}})
					// .open({state: DrawerStateEnum.CREATE})
					.afterClosed()
					.subscribe()
				break
			case 6:
				this.demandVerificationDrawerService
					.open({data: {id}})
					// .open({state: DrawerStateEnum.CREATE})
					.afterClosed()
					.subscribe()
				break
			case 7:
				this.demandFactoringDrawerService
					.open({data: {id}})
					// .open({state: DrawerStateEnum.CREATE})
					.afterClosed()
					.subscribe()
				break
			case 8:
				this.demandAgentDrawerService
					.open({data: {id}})
					// .open({state: DrawerStateEnum.CREATE})
					.afterClosed()
					.subscribe()
				break
			default:
				break
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
