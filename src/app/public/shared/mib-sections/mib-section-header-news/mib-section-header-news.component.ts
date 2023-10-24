import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-section-header-news',
  styleUrls: ['./mib-section-header-news.component.scss'],
  template: `
    <div
      class="mib-section mib-section__header white lg mib-section__header_news"
    >
      <div class="mib-container">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class MibSectionHeaderNewsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
