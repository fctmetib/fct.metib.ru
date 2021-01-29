import { Store, select } from '@ngrx/store';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { currentUserSelector } from 'src/app/auth/store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  public currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));

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
        label: 'Счета',
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
    ];
  }
}
