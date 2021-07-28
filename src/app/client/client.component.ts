import { MenuItem } from 'primeng/api';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './shared/services/notification.service';
import { NotifyDialogComponent } from './shared/components/notify-dialog/notify-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef;

  private subscription$: Subscription = new Subscription();

  constructor(
    private router: Router,
    public dialogService: DialogService,
    private notifyService: NotificationService
  ) {}

  items: MenuItem[];

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
    this.ref = this.dialogService.open(NotifyDialogComponent, {
      header: 'Уведомления',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: notifications,
    });

    this.subscription$.add(
      this.ref.onClose.subscribe(() => {
      })
    );
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
    this.subscription$.unsubscribe();
  }
}
