import { NewsService } from './../../../../shared/services/news.service';
import { Observable } from 'rxjs';
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

    this.newsListOriginal$ = this.newsService.getNewsList();
    this.newsListFiltered$ = this.newsListOriginal$;

    this.filterForm = this.formBuilder.group({
      search: '',
    });

    this.onChanges();
  }

  public openCreateNews() {
    this.ref = this.dialogService.open(CreateNewsDialogComponent, {
      header: 'Создание новости',
      width: '50%',
      contentStyle: { 'max-height': '465px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe(() => {});
  }

  private onChanges(): void {
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
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
