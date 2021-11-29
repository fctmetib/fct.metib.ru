import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DemandLoadingService } from '../../services/demand-loading.service';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandService } from '../../services/demand.service';
import { DemandAction } from '../../types/common/demand-action';
import { DemandActionType } from '../../types/common/demand-action-type';
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';
import { DoDemandPageActionType } from '../../types/navigation-service/do-demand-page-action-type';

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
  private _draftId: number = 0;
  private _saveDraftAction$: NodeJS.Timeout;

  constructor(
    public demandLoadingService: DemandLoadingService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _demandNavigationService: DemandNavigationService,
    private _demandLoadingService: DemandLoadingService,
    private _messageService: MessageService,
    private _demandService: DemandService
  ) {}

  ngOnInit() {
    this._preInitValues();
    this._enableFormListening();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy() {
    this._subscription$.unsubscribe();
    if (this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this._router.navigate([`${baseUrl}/new-demand`]);
  }

  public get demandType(): typeof DemandActionType {
    return DemandActionType;
  }

  private _preInitValues(): void {
    this._subscription$.add(
      this._route.queryParams.subscribe((params: Params) => {
        this._fillConfig(params);
      })
    );
  }

  private _fillConfig(params): void {
    let id: number = params['ID'];
    let type: DemandAction = params['Type'];
    let action: DemandActionType = params['Action'];

    const demandConfig: DemandNavigationInterface = {
      demandAction: type,
      demandActionType: action,
      demandId: id,
    };

    this._demandNavigationService.updateDemandConfig(demandConfig);
    this._initValues();
  }

  private _initValues(): void {
    this.isUserVerified = this._authService.isUserVerified();
    this._subscription$.add(
      this._demandNavigationService.demandConfig$.subscribe((demandConfig) => {
        // Если demand config пустой, значит "логика" не знает,
        // что отрисовать - возвращаем пользователя на страницу назад, для заполнения demand config
        if (!demandConfig) {
          const notVerify = 'not-verify';
          const baseUrl = this.isUserVerified ? '' : notVerify;
          this._router.navigate([`${baseUrl}/new-demand`]);
        }

        this.demandNavigationConfig = demandConfig;
        this._prepareLogic();
      })
    );
  }

  private _enableFormListening(): void {
    this._subscription$.add(
      this._demandNavigationService.doDemandAction$.subscribe(
        (demandAction) => {
          switch (demandAction.type) {
            case DoDemandPageActionType.CREATE:
              this._createDemand(demandAction.data);
              break;
            case DoDemandPageActionType.SAVE_DRAFT:
              this._saveDraft(demandAction.data);
              break;
          }
        }
      )
    );
  }

  private _createDemand(form): void {
    form.DraftID = this._draftId;

    this._demandLoadingService.setRequestLoading(true);
    this._subscription$.add(
      this._demandService.createDemand(form).subscribe(
        (resp) => {
          // TODO: navigate to demand list
          window.scroll(0, 0);
          this._messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Запрос успешно создан!',
          });
          this._demandLoadingService.setRequestLoading(false);
        },
        (error) => {
          window.scroll(0, 0);
          this._messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Произошла ошибка!',
          });
          this._demandLoadingService.setRequestLoading(false);
        }
      )
    );
  }

  private _saveDraft(form): void {
    this._subscription$.add(
      this._demandService.saveDraftById(this._draftId, form).subscribe(
        (resp) => {
          this._draftId = resp.ID;
          this._messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Черновик успешно сохранен!',
          });
        },
        (error) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'При сохранении черновика произошла ошибка!',
          });
        }
      )
    );
  }

  private _prepareLogic(): void {
    switch (this.demandNavigationConfig?.demandActionType) {
      case DemandActionType.CREATE:
        this._getDraft();
        this._enableDraftSaving();
        break;
      case DemandActionType.EDIT_DRAFT:
        this._initEditDraftSettings();
        this._getDraft();
        this._enableDraftSaving();
        break;
      case DemandActionType.EDIT_CREATED:
        this._getDemand();
        break;
      default:
        break;
    }
  }

  private _enableDraftSaving(): void {
    this._saveDraftAction$ = setInterval(() => {
      this._demandNavigationService.doDemandSave$.next();
    }, 30000);
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

  private _getDemand(): void {
    this.demandLoadingService.setPageLoading(true);
    this._subscription$.add(
      this._demandService
        .getDemandById(this.demandNavigationConfig.demandId)
        .subscribe((resp) => {
          this.demandLoadingService.setPageLoading(false);
          this._demandNavigationService.setCurrentDemandData(resp);
        })
    );
  }

  private _initEditDraftSettings(): void {
    this._draftId = this.demandNavigationConfig.demandId;
  }
}
