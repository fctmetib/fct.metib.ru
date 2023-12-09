import { StatisticsInterface } from '../../types/common/statistics.interface'
import { ReportCardInterface } from '../../types/common/report-card.interface'
import { AuthService } from '../../../../../auth/services/auth.service'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class'
import { StatisticsService } from '../../services/statistics.service'

@Component({
	selector: 'app-cabinet-page',
	templateUrl: './cabinet-page.component.html',
	styleUrls: ['./cabinet-page.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CabinetPageComponent implements OnInit {
	public statistics: StatisticsInterface
	public reportCards: ReportCardInterface[] = []

	constructor(
		private authSerice: AuthService,
		private statisticsService: StatisticsService
	) {}

	ngOnInit() {
		this.reportCardsInit()
		this.statisticsService.getClientStatistics().subscribe(resp => {
			this.statistics = resp
		})
	}

	reportCardsInit() {
		let mibCommon = new MIBCommon()
		this.reportCards = mibCommon.getReports()
	}

	public logout(): void {
		this.authSerice.logout()
	}
}
