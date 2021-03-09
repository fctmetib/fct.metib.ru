import { MenuItem } from 'primeng/api';
import { Component, HostListener, OnInit } from '@angular/core';

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
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Заявки',
        routerLink: 'requests',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Свободная задолженность',
        routerLink: 'freeduty',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Договоры',
        routerLink: 'contracts',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Платежи',
        routerLink: 'invoices',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Просрочки Покупателя',
        routerLink: 'delays',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Запросы',
        routerLink: 'demand',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Документы',
        routerLink: 'documents',
        routerLinkActiveOptions: { exact: true },
      },
      // {
      //   label: 'Отчеты',
      //   routerLink: 'reports',
      //   routerLinkActiveOptions: { exact: true }
      // },
    ];
  }

  @HostListener('click', ['$event.target'])
  closeAccountOwner() {
    const _event: any = event;

    if (!_event.target.classList.contains("clickable")) {
      if (document.getElementById('dropdownMenu').classList.contains('show')) {
        document.getElementById('dropdownMenu').classList.remove('show');
      }
    }
  }
}
