import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-card-news',
  styleUrls: ['./mib-card-news.component.scss'],
  template: `
    <div class="mib-card-news">
      <div class="icon">
        <img [src]="icon" alt="Иконка">
      </div>
      <div class="inner">
        {{text}}
      </div>
    </div>
  `,
})
export class MibCardNewsComponent implements OnInit {
  @Input()
  icon: string;

  @Input()
  text: string;

  constructor() {}

  ngOnInit() {}
}
