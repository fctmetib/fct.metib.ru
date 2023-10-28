import {DemandLocalActionsInterface} from '../../types/common/demand-local-actions.interface';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from 'src/app/auth/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-demand-page',
  templateUrl: './demand-page.component.html',
  styleUrls: ['./demand-page.component.scss'],
})
export class DemandPageComponent implements OnInit, OnDestroy {
  actions: DemandLocalActionsInterface[] = [];

  isUserVerified: boolean = false;

  // TEST
  displayModal = false;
  isCertsLoading = false;

  public message = 'METIB';
  public file: string | ArrayBuffer;
  public hash: string = null;
  public hashStatus = 'Не вычислен';
  public detachedSignature = true;
  public thumbprint: string = null;
  public signature: string = null;
  public fileSignature: string = null;
  public signatureStatus = 'Не создана';
  public systemInfo: {
    isValidSystemSetup: boolean;
  };
  public certificateListError: string = null;
  public certificateInfoError: string = null;
  public hashError: string = null;
  public signatureError: string = null;
  public systemInfoError: string = null;
  public certInfo = null;
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement,
    },
  };

  public eds: string = '';
  public filesWithEDS: File[] = [];

  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.initActions();
    this.isUserVerified = this.authService.isUserVerified();

    this.displaySystemInfo();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  initActions() {
    this.actions = [
      {
        text: 'Запрос на редактирование профиля',
        url: 'actions/edit-profile',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на свободную тему',
        url: 'actions/free-request',
        isForNewClient: false,
        isForDefaultClient: true,
      },
      // {
      //   text: 'Запрос в техническую поддержку',
      //   url: 'actions/support-request',
      //   isForNewClient: false,
      //   isForDefaultClient: false,
      // },
      {
        text: 'Запрос на ЭЦП',
        url: 'actions/create-eds',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на поручительство',
        url: 'actions/surety',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на факторинг',
        url: 'actions/factoring',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на агентский факторинг',
        url: 'actions/agent-factoring',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на увеличение лимита',
        url: 'actions/update-limit',
        isForNewClient: false,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на нового дебитора',
        url: 'actions/create-debitor',
        isForNewClient: false,
        isForDefaultClient: true,
      },
      {
        text: 'Регистрация канала верификации',
        url: 'actions/verify',
        isForNewClient: false,
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

  private async displaySystemInfo() {
    this.systemInfoError = null;

    try {
      this.systemInfo = {
        isValidSystemSetup: null,
      };
    } catch (error) {
      this.systemInfoError = error.message;
    }
  }
}
