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
import {DemandSignatureDrawerService} from '../../modules/demand-signature-drawer/demand-signature-drawer.service'
import {DemandSuretyDrawerService} from '../../modules/demand-surety-drawer/demand-surety-drawer.service'
import {DemandEditingDrawerService} from '../../modules/demand-editing-drawer/demand-editing-drawer.service'

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
		private demandEditingDrawerService: DemandEditingDrawerService
	) {}

	ngOnInit(): void {
		this.getAllRequestesList()
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
					console.log('data :>> ', data)
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
		console.log('OpenDrawer>id :>> ', id)
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
			default:
				break
		}
	}
}
