import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-page',
  template: `
    <div class="header lg">
      <div class="title">
        <h2>{{title}}</h2>
        <div class="subheader">{{description}}</div>
      </div>
      <div class="actions">
        <ng-content select=".mib-action"></ng-content>
      </div>
    </div>
  `,
})
export class HeaderPageComponent {

  @Input()
  title: string;

  @Input()
  description: string;
}
