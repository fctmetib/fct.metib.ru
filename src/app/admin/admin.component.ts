import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor() {}
  public items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Главная',
        routerLink: 'cabinet',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Организации',
        routerLink: 'organizations',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Пользователи',
        routerLink: 'users',
        routerLinkActiveOptions: { exact: true },
      },
      // {
      //   label: 'Бизнес-тесты',
      //   routerLink: 'tests',
      //   routerLinkActiveOptions: { exact: true },
      // },
    ];
  }

  ngOnDestroy() {}
}
