import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protected-layout',
  templateUrl: './protected-layout.component.html',
  styleUrls: ['./protected-layout.component.scss'],
})
export class ProtectedLayoutComponent implements OnInit {
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
        label: 'Запросы',
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
        label: 'Заявки',
        routerLink: '/',
        routerLinkActiveOptions: { exact: true }
      },
    ];
  }
}
