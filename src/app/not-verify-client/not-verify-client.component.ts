import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { InactiveDialogComponent } from '../shared/modules/inactive-dialog/inactive-dialog.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/common/localstorage.service';

@Component({
  selector: 'app-not-verify-client',
  templateUrl: './not-verify-client.component.html',
  styleUrls: ['./not-verify-client.component.scss'],
})
export class NotVerifyClientComponent implements OnInit, OnDestroy {
  items: MenuItem[];

  refInactiveDialog: DynamicDialogRef;

  userActivity: NodeJS.Timeout;
  userInactive: Subject<any> = new Subject();
  private subscription$: Subscription = new Subscription();

  public preloader: boolean = false;

  constructor(
    public dialogService: DialogService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.preloader = true;
    //TODO: rework it
    // обновляет страницу, для изоляции стилей
    if (this.localStorageService.getValue('fromPublic')) {
      this.localStorageService.clearValue('fromPublic');
      let currentUrl = this.router.url;
      this.router.navigate([currentUrl]).then(() => {
        window.location.reload();
      });
    } else {
      this.preloader = false;
    }

    this.items = [
      {
        label: 'Запросы',
        routerLink: 'demand',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Кабинет',
        disabled: true,
      },
      {
        label: 'Заявки',
        disabled: true,
      },
      {
        label: 'Свободная задолженность',
        disabled: true,
      },
      {
        label: 'Договоры',
        disabled: true,
      },
      {
        label: 'Платежи',
        disabled: true,
      },
      {
        label: 'Просрочки Покупателя',
        disabled: true,
      },
      {
        label: 'Документы',
        disabled: true,
      },
    ];
    this.setTimeout();
    this.userInactive.subscribe(() => {
      console.log('user has been inactive for 15s');
      this.openInactive();
    });
  }

  public openInactive() {
    if (!this.refInactiveDialog) {
      this.refInactiveDialog = this.dialogService.open(
        InactiveDialogComponent,
        {
          header: 'Внимание',
          width: '50%',
          contentStyle: { 'max-height': '550px', overflow: 'auto' },
          baseZIndex: 10000,
        }
      );

      this.subscription$.add(
        this.refInactiveDialog.onClose.subscribe(() => {
          this.refInactiveDialog = null;
          this.setTimeout();
        })
      );
    }
  }

  setTimeout() {
    this.userActivity = setTimeout(() => {
      this.userInactive.next(undefined);
    }, 900000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  @HostListener('click', ['$event.target'])
  closeAccountOwner() {
    const _event: any = event;

    if (!_event.target.classList.contains('clickable')) {
      if (document.getElementById('dropdownMenu').classList.contains('show')) {
        document.getElementById('dropdownMenu').classList.remove('show');
      }
    }
  }

  ngOnDestroy() {
    if (this.refInactiveDialog) {
      this.refInactiveDialog.close();
    }
    this.userInactive.unsubscribe();
    this.subscription$.unsubscribe();
  }
}
