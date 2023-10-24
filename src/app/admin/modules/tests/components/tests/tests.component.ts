import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';

@Component({
  selector: 'tests',
  template: ` <h1>Бизнес-тесты</h1>`,
})
export class TestsComponent implements OnInit {
  constructor( private pageStoreService: PageStoreService) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Бизнес-тесты',
      description: 'Бизнес-тесты'
    })
  }
}
