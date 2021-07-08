import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-section-body',
  template: `
    <div class="mib-section mib-section__body" [ngClass]="theme">
      <div class="mib-container">
        <div class="pre-header" *ngIf="addonHeader">
          {{ addonHeader }}
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class MibSectionBodyComponent implements OnInit {
  @Input()
  theme: string = 'grey';

  @Input()
  addonHeader: string;

  constructor() {}

  ngOnInit() {}
}
