import { Component, Input, OnInit } from '@angular/core';
import { OrganizationInterface } from 'src/app/admin/shared/types/organization.interface';

@Component({
  selector: 'card-organization-row',
  styleUrls: ['./card-organization-row.component.scss'],
  template: `
    <div class="card-organization-row">
      <div class="card-organization-row__organization">
        <div class="card-organization-row__organization__title">
          <h4>{{ organization?.Title }}</h4>
        </div>
        <div class="card-organization-row__organization__description">
          <p>{{ organization?.Description }}</p>
        </div>
        <div class="card-organization-row__organization__contacts">
          <div class="card-organization-row__organization__contacts__contact" *ngIf="organization?.Telephone">
            <img src="../../../../../../../assets/admin/icons/icon-phone.png" alt="icon phone" />
            {{ organization?.Telephone }}
          </div>
          <div class="card-organization-row__organization__contacts__contact" *ngIf="organization?.Email">
            <img src="../../../../../../../assets/admin/icons/icon-email.png" alt="icon email" />
            {{ organization?.Email }}
          </div>
          <div class="card-organization-row__organization__contacts__contact" *ngIf="organization?.WebSite" >
            <img src="../../../../../../../assets/admin/icons/icon-web.png" alt="icon website" />
            {{ organization?.WebSite }}
          </div>
        </div>
      </div>
      <div class="card-organization-row__information">
        <div class="card-organization-row__information__creditionals">
          <div class="card-organization-row__information__creditionals__creditional">
            <p><strong>ИНН:</strong> {{ organization?.INN ? organization?.INN : '-'}}</p>
          </div>
          <div class="card-organization-row__information__creditionals__creditional">
            <p><strong>КПП:</strong> {{ organization?.KPP ? organization?.KPP : '-'}}</p>
          </div>
        </div>
        <div class="card-organization-row__information__status">
          {{ organization?.State }}
        </div>
      </div>
    </div>
  `,
})
export class CardRowComponent implements OnInit {
  @Input()
  organization: OrganizationInterface;

  constructor() {}

  ngOnInit() {}
}
