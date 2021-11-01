import { Component, OnDestroy, OnInit } from '@angular/core';
import { saveAs } from '@progress/kendo-file-saver';
import { Certificate, createAttachedSignature, createDetachedSignature, createHash, getCertificate, getSystemInfo, getUserCertificates, isValidSystemSetup, SystemInfo } from 'crypto-pro';
import * as JSZip from 'jszip';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CryptoProService } from 'src/app/shared/services/common/cryprto-pro.service';
import { DemandLocalActionsInterface } from '../../types/common/demand-local-actions.interface';

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
    private cryproService: CryptoProService
  ) {}

  ngOnInit() {
    this.initActions();
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }


  initActions() {
    this.actions = [
      {
        text: 'Запрос на ЭЦП',
        url: 'demand-action',
        isForNewClient: true,
        isForDefaultClient: true,
      }
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
