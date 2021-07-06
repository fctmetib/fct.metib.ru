import { MenuItem } from 'primeng/api';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  constructor(private router: Router) {}

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
        routerLinkActiveOptions: { exact: false }
      },
    ];
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

  private isActive(base: string): string {
    if(this.router.url.includes(`/${base}`)) {
      return 'p-menuitem-link-active';
    }
  }
}
