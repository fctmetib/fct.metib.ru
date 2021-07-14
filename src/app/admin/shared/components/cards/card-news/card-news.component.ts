import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-news',
  styleUrls: ['./card-news.component.scss'],
  template: `
    <div class="card-news">
      <div class="header">
        <div class="date">
          {{ date | date:"dd.MM.yyyy"}}
        </div>
        <div class="image">
          <img [src]="imageSource" />
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
export class CardNewsComponent implements OnInit {
  @Input()
  date: string;

  @Input()
  image: string;

  @Input()
  title: string;

  @Input()
  desc: string;


  public imageSource: string = "";

  constructor() {}

  ngOnInit() {
    if(this.image) {
      this.imageSource = `http://api-factoring.metib.ru:8094/api/news/${this.image}/image`
    }  else {
      this.imageSource = '../../../../../../assets/public/images/news/news.png';
    }
  }
}
