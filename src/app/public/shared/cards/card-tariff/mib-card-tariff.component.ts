import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-card-tariff',
  styleUrls: ['./mib-card-tariff.component.scss'],
  template: `
    <div class="mib-card-tariff">
      <div class="header" [ngClass]="theme">
          {{ title }}
      </div>
      <div class="body">
        <div class="item" *ngFor="let item of items">
          <div class="icon">
            <img src="../../../../../assets/icons/icon_success.png">
          </div>
          <div class="text">{{ item }}</div>
        </div>
      </div>
      <div class="footer">
        Получить консультацию
      </div>
    </div>
  `,
})
export class MibCardTariffComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  items: string;

  @Input()
  theme: string;

  constructor() {}

  ngOnInit() {}
}
