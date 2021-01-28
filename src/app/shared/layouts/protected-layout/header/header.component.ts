import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Кабинет',
        routerLink: 'cabinet',
      },
      {
        label: 'Запросы',
        routerLink: 'cabinet',
      },
      {
        label: 'Счета',
        routerLink: 'cabinet',
      },
      {
        label: 'Договоры',
        routerLink: 'cabinet',
      },
      {
        label: 'Документы',
        routerLink: 'cabinet',
      },
      {
        label: 'Отчеты',
        routerLink: 'cabinet',
      },
    ];
  }
}
