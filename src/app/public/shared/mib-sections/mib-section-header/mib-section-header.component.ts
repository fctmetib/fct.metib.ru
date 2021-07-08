import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-section-header',
  template: `
    <div
      class="mib-section mib-section__header white lg"
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

  constructor() {}

  ngOnInit() {}
}
