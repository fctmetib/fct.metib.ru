import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NewsInterface } from '../../../types/news.interface';

@Component({
  selector: 'card-news',
  styleUrls: ['./card-news.component.scss'],
  template: `
    <div class="card-news">
      <div class="header">
        <div class="date">
          {{ date | date:"dd.MM.yyyy"}}
        </div>
        <div class="actions" (click)="onRemove(id)" >
          Удалить
        </div>
        <div class="image">
          <img [src]="imageSource" />
        </div>
      </div>
      <div class="body">
        <div class="title action" (click)="onOpen(id, date, title, desc)">
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
  id: number;

  @Input()
  title: string;

  @Input()
  desc: string;

  @Output()
  remove = new EventEmitter<any>();

  @Output()
  open = new EventEmitter<any>();

  public imageSource: string = "";

  constructor() {}

  ngOnInit() {
    if(this.id) {
      this.imageSource = `http://api-factoring.metib.ru:8094/api/news/${this.id}/image`
    }  else {
      this.imageSource = '../../../../../../assets/public/images/news/news.png';
    }
  }

  public onOpen(id: number, date: string, title: string, desc: string) {
    let data: NewsInterface = {
      Date: date,
      Text: desc,
      Title: title,
      ID: id
    };
    this.open.emit(data)
  }

  public onRemove(id: number) {
    this.remove.emit(
      id
    )
  }
}
