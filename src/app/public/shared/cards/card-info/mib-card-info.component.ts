import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-card-info',
  styleUrls: ['./mib-card-info.component.scss'],
  template: `
    <div class="mib-card-info">
      <div class="icon">
        <img [src]="icon" alt="Иконка">
      </div>
      <div class="inner">
        {{text}}
      </div>
    </div>
  `,
})
export class MibCardInfoComponent implements OnInit {
  @Input()
  icon: string;

  @Input()
  text: string;

  constructor() {}

  ngOnInit() {}
}
