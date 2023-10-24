import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-section-header',
  styleUrls: ['./mib-section-header.component.scss'],
  template: `
    <div
      class="mib-section mib-section__header white lg"
      [ngClass]="pageType"
      [ngStyle]="{ 'background-image': 'url(' + backgroundImageUrl + ')'}"
    >
      <div class="mib-container">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class MibSectionHeaderComponent implements OnInit {
  @Input()
  backgroundImageUrl: string;

  @Input()
  pageType: string;

  constructor() {}

  ngOnInit() {}
}
