import { environment } from 'src/environments/environment';
import { NewsInterface } from 'src/app/admin/shared/types/news.interface';
import { Component, OnInit } from '@angular/core';
import { CabinetNewsService } from '../../../services/news.service';

@Component({
  selector: 'widget-news',
  styleUrls: ['./widget-news.component.scss'],
  templateUrl: './widget-news.component.html',
})
export class WidgetNewsComponent implements OnInit {
  public newsList: NewsInterface[] = []

  constructor(private _cabinetNewsService: CabinetNewsService) {}

  ngOnInit() {
    this.getNews();
  }

  public getImageURL(id) {
    const url = `${environment.apiUrl}/news/${id}/image`
    return url;
  }

  public getNews() {
    this._cabinetNewsService.getNews().subscribe(
      news => {
        this.newsList = news;
      })
  }
}
