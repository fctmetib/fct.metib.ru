import {StatisticsInterface} from '../../types/common/statistics.interface'
import {IReportCard} from '../../types/common/i-report.card'
import {AuthService} from '../../../../../auth/services/auth.service'
import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core'
import {MIBCommon} from 'src/app/shared/classes/common/mid-common.class'
import {StatisticsService} from '../../services/statistics.service'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, Subscription, tap} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'app-cabinet-page',
	templateUrl: './cabinet-page.component.html',
	styleUrls: ['./cabinet-page.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CabinetPageComponent implements OnInit, OnDestroy {
	public statistics: StatisticsInterface
	public reportCards: IReportCard[] = []

	public loading$ = new BehaviorSubject<boolean>(false)

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(
		private authSerice: AuthService,
		private statisticsService: StatisticsService,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit() {
		this.loading$.next(true)
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
		this.reportCardsInit()
		this.statisticsService
			.getClientStatistics()
			.pipe(
				tap(data => {
					this.statistics = data
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	reportCardsInit() {
		let mibCommon = new MIBCommon()
		this.reportCards = mibCommon.getReports()
	}

	public logout(): void {
		this.authSerice.logout()
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
