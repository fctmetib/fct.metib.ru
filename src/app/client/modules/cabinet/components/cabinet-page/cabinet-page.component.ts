import {StatisticsInterface} from '../../types/common/statistics.interface'
import {ReportCardInterface} from '../../types/common/report-card.interface'
import {AuthService} from '../../../../../auth/services/auth.service'
import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {MIBCommon} from 'src/app/shared/classes/common/mid-common.class'
import {StatisticsService} from '../../services/statistics.service'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, tap} from 'rxjs'

@Component({
	selector: 'app-cabinet-page',
	templateUrl: './cabinet-page.component.html',
	styleUrls: ['./cabinet-page.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CabinetPageComponent implements OnInit {
	public statistics: StatisticsInterface
	public reportCards: ReportCardInterface[] = []

	public loading$ = new BehaviorSubject<boolean>(false)

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	constructor(
		private authSerice: AuthService,
		private statisticsService: StatisticsService
	) {}

	ngOnInit() {
		this.loading$.next(true)
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
}
