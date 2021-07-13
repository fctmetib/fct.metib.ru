import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';

@Component({
  selector: 'cabinet',
  template: ` <h1>Главная</h1>`,
})
export class CabinetComponent implements OnInit {
  constructor( private pageStoreService: PageStoreService) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Панель Администратора',
      description: 'Добро пожаловать в панель администратора!'
    })
  }
}
