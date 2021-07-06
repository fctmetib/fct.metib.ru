import { MenuItem } from 'primeng/api';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-verify-client',
  templateUrl: './not-verify-client.component.html',
  styleUrls: ['./not-verify-client.component.scss'],
})
export class NotVerifyClientComponent implements OnInit {
  constructor() {}
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Запросы',
        routerLink: 'demand',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Кабинет',
        disabled: true,
      },
      {
        label: 'Заявки',
        disabled: true,
      },
      {
        label: 'Свободная задолженность',
        disabled: true,
      },
      {
        label: 'Договоры',
        disabled: true,
      },
      {
        label: 'Платежи',
        disabled: true,
      },
      {
        label: 'Просрочки Покупателя',
        disabled: true,
      },
      {
        label: 'Документы',
        disabled: true,
      },
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
