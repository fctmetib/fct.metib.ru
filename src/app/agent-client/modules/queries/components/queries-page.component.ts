import {Component, OnDestroy, OnInit} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, Subscription} from 'rxjs'
import {AnimationService} from 'src/app/shared/animations/animations.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

const ANIMATION_CONFIG = {
	translateDistance: '-3%',
	endOpacity: 0,
	startOpacity: 1,
	duration: 300
}

@Component({
	selector: 'mib-queries-page',
	templateUrl: './queries-page.component.html',
	styleUrls: ['./queries-page.component.scss'],
	animations: [new AnimationService().generateAnimation(ANIMATION_CONFIG)]
})
export class QueriesPageComponent implements OnInit, OnDestroy {
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

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

	queryList = [
		{
			id: 1,
			title: 'Увеличение лимита',
			description:
				'Запрос на увеличение доступных средств для клиента на основе дебиторской задолженности',
			quantity: 12
		},
		{
			id: 2,
			title: 'Добавление кредитора',
			description:
				'Запрос на привлечение и интеграцию дополнительных финансовых партнеров агентом',
			quantity: 0
		}
	]

	constructor(public breakpointService: BreakpointObserverService) {}
	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	openDrawer() {
		console.log('OPEN DRAWER>>>>')
		// this.demandDrawerService
		// 	.open({state: DrawerStateEnum.CREATE})
		// 	.afterClosed()
		// 	.subscribe()
	}

	tablePageChange() {
		console.log('page change')
	}

	openDrawers(id: number) {
		switch (id) {
			case 1:
				console.log('case 1')
				// this.demandSignatureDrawerService
				// 	.open({data: {id}})
				// 	.afterClosed()
				// 	.subscribe()
				break
			case 2:
				console.log('case 2')
				// this.demandSuretyDrawerService
				// 	.open({data: {id}})
				// 	.afterClosed()
				// 	.subscribe()
				break
			default:
				break
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
