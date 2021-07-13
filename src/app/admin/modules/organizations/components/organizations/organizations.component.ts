import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';

@Component({
  selector: 'organizations',
  template: ` <h1>Организации</h1>`,
})
export class OrganizationsComponent implements OnInit {
  constructor( private pageStoreService: PageStoreService) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Организации',
      description: 'Найдите нужную для Вас организацию'
    })
  }
}
