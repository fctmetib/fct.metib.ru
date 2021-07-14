import { OrganizationInterface } from './../../types/organization.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'organizations',
  templateUrl: './organization.component.html'
})
export class OrganizationsComponent implements OnInit {

  public organizationList$: Observable<OrganizationInterface[]>;

  constructor(private pageStoreService: PageStoreService, private organizationService: OrganizationService) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Организации',
      description: 'Найдите нужную для Вас организацию'
    });

    this.organizationList$ = this.organizationService.getOrganizationList();
  }
}
