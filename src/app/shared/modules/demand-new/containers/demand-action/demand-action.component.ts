import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandAction } from '../../types/common/demand-action';
import { DemandActionType } from '../../types/common/demand-action-type';
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';

@Component({
  selector: 'demand-action',
  styleUrls: ['./demand-action.component.scss'],
  templateUrl: './demand-action.component.html',
})
export class DemandActionComponent implements OnInit, OnDestroy, AfterViewInit {
  public isUserVerified: boolean = true;
  public isLoading: boolean = false;
  public actionName: string = 'Запрос на ЭЦП';

  public demandNavigationConfig: DemandNavigationInterface = null;
  private _subscription$: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _demandNavigationService: DemandNavigationService
  ) {}

  ngOnInit() {
    this._subscription$.add(
      this._demandNavigationService.demandConfig$.subscribe((demandConfig) => {
        // Если demand config пустой, значит "логика" не знает,
        // что отрисовать - возвращаем пользователя на страницу назад, для заполнения demand config
        if (!demandConfig) {
          this._router.navigate(['/new-demand']);
        }

        this.demandNavigationConfig = demandConfig;
      })
    );
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }

  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this._router.navigate([`${baseUrl}/new-demand`]);
  }

  public get demandType(): typeof DemandActionType {
    return DemandActionType;
  }
}
