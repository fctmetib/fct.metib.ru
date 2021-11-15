import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DemandLoadingService } from '../../services/demand-loading.service';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandService } from '../../services/demand.service';
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
  public actionName: string = 'Запрос на ЭЦП';

  public demandNavigationConfig: DemandNavigationInterface = null;
  private _subscription$: Subscription = new Subscription();
  private _saveDraftAction$: NodeJS.Timeout;

  constructor(
    public demandLoadingService: DemandLoadingService,
    private _router: Router,
    private _demandNavigationService: DemandNavigationService,
    private _demandService: DemandService
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
        this._prepareLogic();
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

  private _prepareLogic(): void {
    switch (this.demandNavigationConfig?.demandActionType) {
      case DemandActionType.CREATE:
          this._getDraft();
        break;

      default:
        break;
    }

    // TODO: save draft
  }

  private _enableDraftSaving(): void {
    this._saveDraftAction$ = setInterval(() => this._saveDraft(), 30000);
  }

  private _getDraft(): void {
    this.demandLoadingService.setPageLoading(true);
    this._subscription$.add(
      this._demandService
        .prepareDemandByType(this._getType())
        .subscribe((resp) => {
          this.demandLoadingService.setPageLoading(false);
          this._demandNavigationService.setCurrentDemandData(resp);
        })
    );
  }

  private _saveDraft(): void {
    console.log('Draft saved')
  }

  private _getType(): string {
    switch (this.demandNavigationConfig.demandAction) {
      case DemandAction.EDS:
        return 'DigitalSignature'
    }
  }
}
