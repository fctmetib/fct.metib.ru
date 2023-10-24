import { environment } from 'src/environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mib-card-news',
  styleUrls: ['./mib-card-news.component.scss'],
  template: `
    <div class="mib-card-news can-click" (click)="openNews(id)" >
      <div class="header">
        <div class="date">
          {{ date | date:"dd.MM.yyyy"}}
        </div>
        <div class="image">
          <img [src]="imageSrc" />
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
  id: string;

  @Input()
  title: string;

  @Input()
  desc: string;

  @Output()
  read = new EventEmitter<any>();

  public imageSrc: string;

  constructor() {}

  ngOnInit() {
    this.imageSrc = `${environment.apiUrl}/news/${this.id}/image`
  }

  public openNews(id: string) {
    this.read.emit(id);
  }
}
