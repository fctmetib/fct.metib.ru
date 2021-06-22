import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-card-info',
  styleUrls: ['./mib-card-info.component.scss'],
  template: `
    <div class="mib-card-info">
      <div class="icon">
        <img [src]="icon" alt="Иконка">
      </div>
      <div class="content">
        Факторинг помогает разморозить деньги, зависшие в дебиторке, и сразу
        направить их в оборот
      </div>
    </div>
  `,
})
export class MibCardInfoComponent implements OnInit {
  @Input()
  icon: string;

  constructor() {}

  ngOnInit() {}
}
