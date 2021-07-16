import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationStaffInterface } from 'src/app/admin/shared/types/organization-view.interface';
import { OrganizationInterface } from 'src/app/admin/shared/types/organization.interface';

@Component({
  selector: 'organization',
  templateUrl: './organization.component.html',
})
export class OrganizationComponent implements OnInit {
  public organizationStaff$: Observable<OrganizationStaffInterface[]>;
  public organizationInfo$: Observable<OrganizationInterface>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('IM AID', id)
    this.organizationStaff$ = this.organizationService.getOrganizationStaffById(id);
    this.organizationInfo$ = this.organizationService.getOrganizationInfoById(id);
  }

  ngOnInit() {
  }
}
