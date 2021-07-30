import { MenuItem } from 'primeng/api';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './shared/services/notification.service';
import { NotifyDialogComponent } from './shared/components/notify-dialog/notify-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, Subscription } from 'rxjs';
import { InactiveDialogComponent } from '../shared/components/inactive-dialog/inactive-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit, OnDestroy {
  refNotificationDialog: DynamicDialogRef;
  refInactiveDialog: DynamicDialogRef;

  userActivity;
  userInactive: Subject<any> = new Subject();

  private subscription$: Subscription = new Subscription();

  items: MenuItem[];

  constructor(
    private router: Router,
    public dialogService: DialogService,
    private notifyService: NotificationService
  ) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      console.log('user has been inactive for 15s');
      this.openInactive();
    });
  }


  ngOnInit() {
    this.items = [
      {
        label: 'Кабинет',
        routerLink: 'cabinet',
        routerLinkActiveOptions: { exact: false },
      },
      {
        label: 'Заявки',
        routerLink: 'requests',
        routerLinkActiveOptions: { exact: false },
      },
      {
        label: 'Свободная задолженность',
        routerLink: 'freeduty',
        routerLinkActiveOptions: { exact: false },
      },
      {
        label: 'Договоры',
        routerLink: 'contracts',
        routerLinkActiveOptions: { exact: false },
      },
      {
        label: 'Платежи',
        routerLink: 'invoices',
        routerLinkActiveOptions: { exact: false },
      },
      {
        label: 'Просрочки Покупателя',
        routerLink: 'delays',
        routerLinkActiveOptions: { exact: false },
      },
      {
        label: 'Запросы',
        routerLink: 'demand',
        routerLinkActiveOptions: { exact: false },
      },
      {
        label: 'Документы',
        routerLink: 'documents',
        routerLinkActiveOptions: { exact: false },
      },
      {
        label: 'Отчеты',
        routerLink: 'reports',
        routerLinkActiveOptions: { exact: false },
      },
    ];

    this.subscription$.add(
      this.notifyService.getNewNotifications().subscribe((resp) => {
        if (resp.length > 0) {
          this.openNotifications(resp);
        }
      })
    );
  }

  public openNotifications(notifications: any[]) {
    this.refNotificationDialog = this.dialogService.open(NotifyDialogComponent, {
      header: 'Уведомления',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: notifications,
    });

    this.subscription$.add(this.refNotificationDialog.onClose.subscribe(() => {}));
  }

  public openInactive() {
    if(!this.refInactiveDialog) {
      this.refInactiveDialog = this.dialogService.open(InactiveDialogComponent, {
        header: 'Внимание',
        width: '50%',
        contentStyle: { 'max-height': '550px', overflow: 'auto' },
        baseZIndex: 10000,
      });

      this.subscription$.add(this.refInactiveDialog.onClose.subscribe(() => {}));
    }
  }

  setTimeout() {
    this.userActivity = setTimeout(
      () => this.userInactive.next(undefined),
      15000
    );
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
    this.refInactiveDialog.close();
    this.refNotificationDialog.close();
    this.subscription$.unsubscribe();
  }
}
