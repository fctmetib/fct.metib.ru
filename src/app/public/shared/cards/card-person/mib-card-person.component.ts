import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-card-person',
  styleUrls: ['./mib-card-person.component.scss'],
  template: `
    <div class="mib-card-person">
      <div class="ava" [ngStyle]="{'background-image': 'url(' + avatar + ')'}">
      </div>
      <div class="person">
        <div class="name">
          {{ name }}
        </div>
        <div class="position">
          {{ position }}
        </div>
        <div class="email">
          {{ email }}
        </div>
      </div>
    </div>
  `,
})
export class MibCardPersonComponent implements OnInit {
  @Input()
  avatar: string;

  @Input()
  name: string;

  @Input()
  position: string;

  @Input()
  email: string;

  constructor() {}

  ngOnInit() {}
}
