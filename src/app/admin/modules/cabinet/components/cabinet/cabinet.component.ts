import { NewsService } from './../../../../shared/services/news.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';
import { NewsInterface } from 'src/app/admin/shared/types/news.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateNewsDialogComponent } from '../create-news-dialog/create-news-dialog.component';

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
})
export class CabinetComponent implements OnInit {
  public filterForm: FormGroup;
  public newsListOriginal$: Observable<NewsInterface[]>;
  public newsListFiltered$: Observable<NewsInterface[]>;

  ref: DynamicDialogRef;

  private subscription$: Subscription = new Subscription();

  constructor(
    private pageStoreService: PageStoreService,
    private newsService: NewsService,
    public dialogService: DialogService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Панель Администратора',
      description: 'Добро пожаловать в панель администратора!',
    });

    this.fetch();

    this.filterForm = this.formBuilder.group({
      search: '',
    });

    this.onChanges();
  }

  public handleRemove(newsID: string) {
    this.subscription$.add(
      this.newsService.removeNewsItem(newsID).subscribe(removeResponse => {
        this.fetch();
      })
    );
  }

  public openCreateNews(newsItem?: NewsInterface) {
    this.ref = this.dialogService.open(CreateNewsDialogComponent, {
      header: 'Создание новости',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: newsItem,
    });

    this.subscription$.add(
      this.ref.onClose.subscribe(() => {
        this.fetch();
      })
    );
  }

  private fetch() {
    this.newsListOriginal$ = this.newsService.getNewsList();
    this.newsListFiltered$ = this.newsListOriginal$.pipe(map(newsList => newsList));
  }

  private onChanges(): void {
    this.subscription$.add(
      this.filterForm.valueChanges.subscribe((value) => {
        this.newsListFiltered$ = this.newsListOriginal$.pipe(
          map((news) => {
            return news.filter(
              (newsItem) =>
                newsItem.Title.includes(value.search) ||
                newsItem.Text.includes(value.search)
            );
          })
        );
      })
    );
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.subscription$.unsubscribe();
  }
}
