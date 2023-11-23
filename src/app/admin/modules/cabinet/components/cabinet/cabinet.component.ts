import { Paginator } from 'primeng/paginator';
import { NewsService } from './../../../../shared/services/news.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';
import { NewsInterface } from 'src/app/admin/shared/types/news.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateNewsDialogComponent } from '../create-news-dialog/create-news-dialog.component';

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
})
export class CabinetComponent implements OnInit {
  public filterForm: FormGroup;
  public newsListOriginal: NewsInterface[] = [];
  public newsListFiltered: NewsInterface[] = [];
  public newsListDisplayed: NewsInterface[] = [];

  @ViewChild('paginator', { static: false }) paginator!: Paginator;
  public paginationPage: number = 0;
  public paginationRows: number = 10;

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
      this.newsService.removeNewsItem(newsID).subscribe((removeResponse) => {
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

  public paginate(event?): void {
    this.newsListDisplayed = [];
    if (event) {
      this.paginationPage = event.page;

      let currentIndex = event.page * event.rows;
      this.newsListDisplayed = this.newsListFiltered.slice(
        currentIndex,
        currentIndex + event.rows
      );
    } else {
      let currentIndex = this.paginationPage * this.paginationRows;
      this.updateCurrentPage(currentIndex);

      this.newsListDisplayed = this.newsListFiltered.slice(
        currentIndex,
        currentIndex + this.paginationRows
      );
    }
  }

  private fetch() {
    this.newsService.getNewsList().subscribe((newsListResponse) => {
      this.newsListOriginal = newsListResponse;
      this.newsListFiltered = newsListResponse;
      this.paginate()
    });
  }

  private onChanges(): void {
    this.subscription$.add(
      this.filterForm.valueChanges.subscribe((value) => {
        this.newsListFiltered = this.newsListOriginal.filter(
          (newsItem) =>
            newsItem.Title.includes(value.search) ||
            newsItem.Text.includes(value.search)
        );
        this.paginate();
      })
    );
  }

  private updateCurrentPage(currentPage: number): void {
    this.paginator.changePage(currentPage);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.subscription$.unsubscribe();
  }
}
