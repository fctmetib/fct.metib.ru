import { NewsService } from './../../../../shared/services/news.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';
import { NewsInterface } from 'src/app/admin/shared/types/news.interface';

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
})
export class CabinetComponent implements OnInit {

  public newsList$: Observable<NewsInterface[]>;

  constructor(private pageStoreService: PageStoreService, private newsService: NewsService) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Панель Администратора',
      description: 'Добро пожаловать в панель администратора!'
    });

    this.newsList$ = this.newsService.getNewsList();
  }
}
