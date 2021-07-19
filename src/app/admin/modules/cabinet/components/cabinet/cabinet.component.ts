import { NewsService } from './../../../../shared/services/news.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';
import { NewsInterface } from 'src/app/admin/shared/types/news.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
})
export class CabinetComponent implements OnInit {
  public filterForm: FormGroup;
  public newsList$: Observable<NewsInterface[]>;

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

    this.newsList$ = this.newsService.getNewsList();
    this.filterForm = this.formBuilder.group({
      search: '',
    });

    this.onChanges();
  }
  onChanges(): void {
    this.filterForm.valueChanges
      .subscribe((value) => {
        console.log('asd 1', value)
        this.newsList$.pipe(
          map((news) => {
            console.log('asd 2', value.search)
            console.log('asd 3', news)
            return news.find(
              (newsItem) =>
                newsItem.Title.includes(value.search) ||
                newsItem.Text.includes(value.search)
            );
          })
        );
      });
  }
}
