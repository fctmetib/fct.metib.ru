import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { currentUserFactoringSelector } from 'src/app/auth/store/selectors';
import { CurrentUserFactoringInterface } from '../../../types/currentUserFactoring.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.currentUserFactoring$ = this.store.pipe(select(currentUserFactoringSelector));

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
