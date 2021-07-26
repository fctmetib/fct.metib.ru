import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { adminUserFactoringSelector } from '../auth/store/selectors';
import { getCurrentUserAdminAction } from '../auth/store/actions/getCurrentAdmin.action';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private store: Store) {}
  public items: MenuItem[];

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAdminAction());
    this.store.pipe(select(adminUserFactoringSelector));

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
