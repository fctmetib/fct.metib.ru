import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from '@progress/kendo-file-saver';
import {
  Certificate,
  createAttachedSignature,
  createDetachedSignature,
  createHash,
  getCertificate,
  getSystemInfo,
  getUserCertificates,
  isValidSystemSetup,
  SystemInfo,
} from 'crypto-pro';
import * as JSZip from 'jszip';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CryptoProService } from 'src/app/shared/services/common/cryprto-pro.service';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandAction } from '../../types/common/demand-action';
import { DemandActionType } from '../../types/common/demand-action-type';
import { DemandLocalActionsInterface } from '../../types/common/demand-local-actions.interface';
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';

@Component({
  selector: 'demand-actions',
  styleUrls: ['./demand-actions.component.scss'],
  templateUrl: './demand-actions.component.html',
})
export class DemandActionsComponent implements OnInit, OnDestroy {
  actions: DemandLocalActionsInterface[] = [];

  isUserVerified: boolean = false;

  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private _demandNavigationService: DemandNavigationService,
    private _router: Router,
    private cryproService: CryptoProService
  ) {}

  ngOnInit() {
    this._initActions();
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  /**
   * Открывает новую страницу, по выбранному Запросу
   */
  public openDemandAction(action: DemandAction): void {
    const demandConfig: DemandNavigationInterface = {
      demandAction: action,
      demandActionType: DemandActionType.CREATE,
      demandId: 0,
    };
    this._demandNavigationService.updateDemandConfig(demandConfig);

    // const url = `${this._router.url}/demand-action`;
    // this._router.navigateByUrl(url);

    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;

    this._router.navigate([`${baseUrl}/new-demand/demand-action`], {
      queryParams: {
        ID: 0, // Id запроса
        Type: action, // Factoring, EDS и тд
        Action: DemandActionType.CREATE, // Редактирование, создание и тд
      },
    });
  }

  /**
   * Производит инициализацию списка запросов, на основе ролей пользователя
   */
  private _initActions(): void {
    this.actions = [
      {
        text: 'Запрос на ЭЦП',
        url: 'demand-action',
        action: DemandAction.EDS,
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на Факторинг',
        url: 'demand-action',
        action: DemandAction.FACTORING,
        isForNewClient: true,
        isForDefaultClient: true,
      },
    ];

    let user = this.authService.getUserFromStore();
    if (user && user.DebtorID) {
      let updateAction = this.actions.find(
        (x) => x.text === 'Запрос на агентский факторинг'
      );
      let updatedAction = {
        ...updateAction,
        isForNewClient: false,
        isForDefaultClient: false,
      };

      let index = this.actions.indexOf(updateAction);
      this.actions[index] = updatedAction;
    }
    if (user && user.CustomerID) {
      let updateAction = this.actions.find(
        (x) => x.text === 'Запрос на факторинг'
      );
      let updatedAction = {
        ...updateAction,
        isForNewClient: false,
        isForDefaultClient: false,
      };

      let index = this.actions.indexOf(updateAction);
      this.actions[index] = updatedAction;
    }
  }
}
