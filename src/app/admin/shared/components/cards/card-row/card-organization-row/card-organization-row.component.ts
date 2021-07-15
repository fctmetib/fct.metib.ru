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
          <div class="card-organization-row__organization__contacts__phone">
            <img src="" alt="icon phone" />
            {{ organization?.Telephone }}
          </div>
          <div class="card-organization-row__organization__contacts__email">
            <img src="" alt="icon email" />
            {{ organization?.Email }}
          </div>
          <div class="card-organization-row__organization__contacts__web">
            <img src="" alt="icon website" />
            {{ organization?.WebSite }}
          </div>
        </div>
      </div>
      <div class="card-organization-row__information">
        <div class="card-organization-row__information__creditionals">
          <div class="card-organization-row__information__creditionals__inn">
            <p>{{ organization?.INN }}</p>
          </div>
          <div class="card-organization-row__information__creditionals__kpp">
            <p>{{ organization?.KPP }}</p>
          </div>
        </div>
        <div class="card-organization-row__information__status">
          <p>{{ organization?.State }}</p>
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
