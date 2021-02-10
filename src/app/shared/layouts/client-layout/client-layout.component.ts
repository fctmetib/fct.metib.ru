import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss'],
})
export class ClientLayoutComponent implements OnInit {
  constructor() {}

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Кабинет',
        routerLink: 'cabinet',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Заявки',
        routerLink: 'requests',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Платежи',
        routerLink: 'invoices',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Договоры',
        routerLink: 'contracts',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Документы',
        routerLink: 'documents',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Отчеты',
        routerLink: 'reports',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Запросы',
        routerLink: 'demand',
        routerLinkActiveOptions: { exact: true }
      },
    ];
  }
}
