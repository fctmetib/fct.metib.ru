import { NewsService } from './../../../../shared/services/news.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';
import { NewsInterface } from 'src/app/admin/shared/types/news.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
})
export class CabinetComponent implements OnInit {
  public filterForm: FormGroup;
  public newsListOriginal$: Observable<NewsInterface[]>;
  public newsListFiltered$: Observable<NewsInterface[]>;

  constructor(
    private pageStoreService: PageStoreService,
    private newsService: NewsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Панель Администратора',
      description: 'Добро пожаловать в панель администратора!',
    });

    this.newsListOriginal$ = this.newsService.getNewsList();
    this.newsListFiltered$ = this.newsListOriginal$;

    this.filterForm = this.formBuilder.group({
      search: '',
    });

    this.onChanges();
  }
  onChanges(): void {
    this.filterForm.valueChanges.subscribe((value) => {
      this.newsListFiltered$ = this.newsListOriginal$.pipe(
        map((news) => {
          return news.filter((newsItem) =>
            newsItem.Title.includes(value.search) ||
            newsItem.Text.includes(value.search)
          );
        })
      );
    });
  }
}
