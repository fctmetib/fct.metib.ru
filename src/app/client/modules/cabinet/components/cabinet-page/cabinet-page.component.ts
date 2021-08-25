import { StatisticsInterface } from './../../types/common/statistics.interface';
import { ReportCardInterface } from './../../types/common/report-card.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import {
  currentUserFactoringSelector,
  isLoadingSelector,
} from 'src/app/auth/store/selectors';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-cabinet-page',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.scss'],
})
export class CabinetPageComponent implements OnInit {
  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public loading$: Observable<boolean | null>;

  public statistics: StatisticsInterface;
  public reportCards: ReportCardInterface[] = [];

  constructor(private authSerice: AuthService, private statisticsService: StatisticsService,  private store: Store) {}

  ngOnInit() {
    this.reportCardsInit();
    this.loading$ = this.store.pipe(select(isLoadingSelector));
    this.currentUserFactoring$ = this.store.pipe(
      select(currentUserFactoringSelector)
    );
    this.statisticsService.getClientStatistics().subscribe(resp => {
      this.statistics = resp;
    })
  }

  reportCardsInit() {
    let mibCommon = new MIBCommon();
    this.reportCards = mibCommon.getReports();
  }

  public logout(): void {
    this.authSerice.logout();
  }
}
