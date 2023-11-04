import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
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
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'demand-action',
  styleUrls: ['./demand-action.component.scss'],
  templateUrl: './demand-action.component.html',
})
export class DemandActionComponent implements OnInit, OnDestroy, AfterViewInit {
  public isUserVerified: boolean = true;

  public demandNavigationConfig: DemandNavigationInterface = null;

  private _subscription$: Subscription = new Subscription();
  private _draftId: number = 0;
  private _saveDraftAction$: ReturnType<typeof setTimeout>;

  constructor(
    public demandLoadingService: DemandLoadingService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _demandNavigationService: DemandNavigationService,
    private _demandLoadingService: DemandLoadingService,
    private _messageService: MessageService,
    private _demandService: DemandService,
    @Inject(PLATFORM_ID) private platformId: Object
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

  public getActionName(): string {
    switch (this.demandNavigationConfig.demandAction) {
      case DemandAction.AGENT_FACTORING:
        return 'Запрос на Агентский Факторинг';
      case DemandAction.CREATE_DEBITOR:
        return 'Запрос на добавление дебитора';
      case DemandAction.EDIT_PROFILE:
        return 'Запрос на редактирование профиля';
      case DemandAction.EDS:
        return 'Запрос на ЭЦП';
      case DemandAction.FACTORING:
        return 'Запрос на Факторинг';
      case DemandAction.FREE_REQUEST:
        return 'Запрос на свободную тему';
      case DemandAction.SURETY:
        return 'Запрос на поручительство';
      case DemandAction.UPDATE_LIMIT:
        return 'Запрос на обновление лимита';
      case DemandAction.VERIFY:
        return 'Запрос на верификацию';
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
            case DoDemandPageActionType.SEND_MESSAGE:
              this._sendMessage(demandAction.data);
              break;
            case DoDemandPageActionType.REMOVE_FILE:
              this._removeFile(demandAction.data);
              break;
            case DoDemandPageActionType.DOWNLOAD_DIGITAL_SIGNATURE_ANKET:
              this._downloadDigitalSignatureAnket(demandAction.data);
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

          // Выключаем сохранение
          if (this._saveDraftAction$) {
            clearInterval(this._saveDraftAction$);
          }

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
        this._getDraftById();
        this._enableDraftSaving();
        break;
      case DemandActionType.EDIT_CREATED:
        this._getDemand();
        break;
      case DemandActionType.VIEW:
        this._getDemand();
        break;
    }
  }

  private _enableDraftSaving(): void {
    this._saveDraftAction$ = setInterval(() => {
      this._demandNavigationService.doDemandSave$.next();
    }, 30000);
  }

  private _downloadDigitalSignatureAnket(data): void {
    this._demandService.getDigitalSignatureRequest(data).subscribe((resp) => {
      let binaryData = [];
      binaryData.push(resp);
      if (isPlatformBrowser(this.platformId)) {
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: 'application/msword' })
        );
        downloadLink.setAttribute('download', 'Заявка_на_выдачу_сертификата.rtf');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    });
  }

  private _removeFile(form): void {
    const newFiles =
      this._demandNavigationService.currentDemandInfoData$.value.Files.filter(
        (x) => x !== form
      );
    const updatedDemandInfo = { Files: newFiles };
    this._demandNavigationService.updateCurrentDemandInfoData(
      updatedDemandInfo
    );
  }

  private _sendMessage(form): void {
    this._subscription$.add(
      this._demandService
        .addMessageByDemandId(this.demandNavigationConfig.demandId, form)
        .subscribe(() => {
          this._getDemand();
        })
    );
  }

  private _getDraftById(): void {
    this.demandLoadingService.setPageLoading(true);
    this._subscription$.add(
      this._demandService
        .getDemandDraftById(this.demandNavigationConfig.demandId)
        .subscribe((resp) => {
          this.demandLoadingService.setPageLoading(false);
          this._demandNavigationService.setCurrentDemandData(resp.Data);
        })
    );
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
          const demandData = resp.Data;
          const demandInfoData = this._convertToDemandInfoData(resp);
          this._demandNavigationService.setCurrentDemandData(demandData);
          this._demandNavigationService.setCurrentDemandInfoData(
            demandInfoData
          );
        })
    );
  }

  private _initEditDraftSettings(): void {
    this._draftId = this.demandNavigationConfig.demandId;
  }

  private _convertToDemandInfoData(data: any): any {
    return {
      DateCreated: data.DateCreated,
      DateModify: data.DateModify,
      DateStatus: data.DateStatus,
      Files: data.Files,
      ID: data.ID,
      Manager: data.Manager,
      Messages: data.Messages,
      Requirements: data.Requirements,
      Result: data.Result,
      Status: data.Status,
      Steps: data.Steps,
      Type: data.Type,
      User: data.User,
    };
  }
}
