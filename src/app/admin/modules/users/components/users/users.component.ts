import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  constructor( private pageStoreService: PageStoreService) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Пользователи',
      description: 'Найдите и войдите от имени интересующего Вас пользователя'
    })
  }
}
