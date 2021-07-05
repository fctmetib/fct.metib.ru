import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-card-news',
  styleUrls: ['./mib-card-news.component.scss'],
  template: `
    <div class="mib-card-news">
      <div class="header">
        <div class="date">
          {{ date }}
        </div>
        <div class="image">
          <img [src]="image" />
        </div>
      </div>
      <div class="body">
        <div class="title">
          {{ title }}
        </div>
        <div class="desc">
          {{ desc }}
        </div>
      </div>
    </div>
  `,
})
export class MibCardNewsComponent implements OnInit {
  @Input()
  date: string;

  @Input()
  image: string;

  @Input()
  title: string;

  @Input()
  desc: string;

  constructor() {}

  ngOnInit() {}
}
