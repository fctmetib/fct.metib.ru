import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
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
    private _authService: AuthService,
    private _demandNavigationService: DemandNavigationService,
    private _demandService: DemandService
  ) {}

  ngOnInit() {
    this.isUserVerified = this._authService.isUserVerified();

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

  ngAfterViewInit(): void {}

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }

  public onSubmit(form) {
    console.log('LEVEL 3', form)
    //  this.isRequestLoading = true;
    this._subscription$.add(
      this._demandService.createDemand(form).subscribe((resp) => {
        // this.alert = true;
        window.scroll(0, 0);
        // this.alertMessage = [
        //    {
        //     severity: 'success',
        //      summary: 'Успешно!',
        //     detail: 'Запрос успешно создан.',
        //    },
        //];
        //    this.isRequestLoading = false;
      })
    );
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
        this._enableDraftSaving();
        break;

      default:
        break;
    }
  }

  private _enableDraftSaving(): void {
    this._saveDraftAction$ = setInterval(() => this._saveDraft(), 30000);
  }

  private _getDraft(): void {
    this.demandLoadingService.setPageLoading(true);
    this._subscription$.add(
      this._demandService
        .prepareDemandByType(this.demandNavigationConfig.demandAction)
        .subscribe((resp) => {
          this.demandLoadingService.setPageLoading(false);
          this._demandNavigationService.setCurrentDemandData(resp);
        })
    );
  }

  private _saveDraft(): void {
    // TODO: save draft
    console.log('Draft saved');
  }
}
