import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-card-info',
  styleUrls: ['./mib-card-info.component.scss'],
  template: `
    <div class="mib-card-info">
      <div class="icon">
        <img [src]="icon" alt="Иконка">
      </div>
      <div class="inner" [ngClass]="size">
        <div class="text">
          {{text}}
        </div>
      </div>
    </div>
  `,
})
export class MibCardInfoComponent implements OnInit {
  @Input()
  icon: string;

  // xl, lg - default
  @Input()
  size: string = 'lg';

  @Input()
  text: string;

  constructor() {}

  ngOnInit() {}
}
