import { Component, Input } from '@angular/core';

@Component({
  selector: 'mib-section-body',
  template: `
    <div class="mib-section mib-section__body" [ngClass]="theme">
      <div class="mib-container">
        <div class="pre-header" *ngIf="addonHeader">
          {{ addonHeader }}
        </div>
        <ng-content></ng-content>
        <div [innerHTML]="contentHTML" *ngIf="contentHTML"></div>
      </div>
    </div>
  `,
})
export class MibSectionBodyComponent {
  @Input()
  public theme: string = 'grey';

  @Input()
  public addonHeader: string;

  @Input()
  public contentHTML: string;
}
