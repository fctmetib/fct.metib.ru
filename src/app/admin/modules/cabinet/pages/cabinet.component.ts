import {Paginator} from 'primeng/paginator'
import {
	BehaviorSubject,
	Subscription,
	filter,
	finalize,
	map,
	switchMap,
	takeUntil,
	tap,
	zip
} from 'rxjs'
import {Component, OnInit, ViewChild} from '@angular/core'
import {PageStoreService} from 'src/app/admin/shared/services/page-store.service'
import {NewsInterface} from 'src/app/admin/shared/types/news.interface'
import {FormBuilder, FormGroup} from '@angular/forms'
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog'
import {CreateNewsDialogComponent} from '../components/create-news-dialog/create-news-dialog.component'
import {CabinetNewsDrawerComponent} from '../modules/cabinet-news-drawer/cabinet-news-drawer.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {CabinetNewsDrawerService} from '../modules/cabinet-news-drawer/cabinet-news-drawer.service'
import {CabinetCreateNewsDrawerService} from '../modules/cabinet-create-news-drawer/cabinet-create-news-drawer.service'
import {CabinetEditNewsDrawerService} from '../modules/cabinet-edit-news-drawer/cabinet-edit-news-drawer.service'
import {AdvancedNewsInterface} from 'src/app/public/type/news.interface'
import {NewsService} from 'src/app/public/service/news.service'
import {Properties} from 'csstype'
import {AutoUnsubscribeService} from 'src/app/shared/services/auto-unsubscribe.service'

@Component({
	selector: 'cabinet',
	styleUrls: ['./cabinet.component.scss'],
	templateUrl: './cabinet.component.html'
})
export class CabinetComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)
	isAdmin: boolean = true

	newsDatas = {
		id: 1,
		img: './assets/images/news/news-1.jpg',
		title: 'С Наступающим Новым 2024 годом!',
		date: '10 декабря 2023',
		link: '/news/1'
	}

	public newsNumberCount: number = 4
	public getAdvancedNews: AdvancedNewsInterface[]

	public skeleton: Properties = {
		borderRadius: '8px',
		height: '240px',
		width: '100%'
	}

	constructor(
		private cabinetNewsDrawerService: CabinetNewsDrawerService,
		private сabinetCreateNewsDrawerService: CabinetCreateNewsDrawerService,
		private au: AutoUnsubscribeService,
		private dialog: MatDialog,
		private newsService: NewsService
	) {}

	ngOnInit(): void {
		this.getCurrentNews()
		this.dialog.afterOpened
			.pipe(
				tap(dialogRef => {
					this.subscribeToDialogClose(dialogRef)
				}),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
	}

	public getCurrentNews() {
		this.loading$.next(true)
		this.newsService
			.getNews(this.newsNumberCount)
			.pipe(
				switchMap(news =>
					zip(
						news.map(item =>
							this.newsService
								.getNewsImage(item.ID)
								.pipe(map(image => ({...item, Image: image})))
						)
					).pipe(
						tap(data => {
							this.getAdvancedNews = data
							console.log('data :>> ', data)
						})
					)
				),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	subscribeToDialogClose(dialogRef: MatDialogRef<any>) {
		dialogRef
			.afterClosed()
			// .pipe(takeUntil(this.au.destroyer))
			.pipe(filter(Boolean), takeUntil(this.au.destroyer))
			.subscribe(() => {
				this.getCurrentNews()
			})
	}

	addNews() {
		console.log('add news')
	}

	editNews(id: number) {
		console.log('editNews - ', id)
	}

	deleteNews(id: number) {
		this.newsService.removeNewsItem(id).subscribe()
		this.getCurrentNews()
	}

	openNewsDrawer(id: number) {
		console.log('openNewsDrawer -  :>> ', id)
		this.cabinetNewsDrawerService.open({data: {id}}).afterClosed().subscribe()
	}

	openCreateNewsDrawer(id?: number) {
		this.сabinetCreateNewsDrawerService
			.open({data: {id}})
			.afterClosed()
			.subscribe()
	}
}

//   public filterForm: FormGroup;
//   public newsListOriginal: NewsInterface[] = [];
//   public newsListFiltered: NewsInterface[] = [];
//   public newsListDisplayed: NewsInterface[] = [];

//   @ViewChild('paginator', { static: false }) paginator!: Paginator;
//   public paginationPage: number = 0;
//   public paginationRows: number = 10;

//   ref: DynamicDialogRef;

//   private subscription$: Subscription = new Subscription();

//   constructor(
//     private pageStoreService: PageStoreService,
//     private newsService: NewsService,
//     public dialogService: DialogService,
//     private formBuilder: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.pageStoreService.setPage({
//       header: 'Панель Администратора',
//       description: 'Добро пожаловать в панель администратора!',
//     });

//     this.fetch();

//     this.filterForm = this.formBuilder.group({
//       search: '',
//     });

//     this.onChanges();
//   }

//   public handleRemove(newsID: string) {
//     this.subscription$.add(
//       this.newsService.removeNewsItem(newsID).subscribe((removeResponse) => {
//         this.fetch();
//       })
//     );
//   }

//   public openCreateNews(newsItem?: NewsInterface) {
//     this.ref = this.dialogService.open(CreateNewsDialogComponent, {
//       header: 'Создание новости',
//       width: '50%',
//       contentStyle: { 'max-height': '550px', overflow: 'auto' },
//       baseZIndex: 10000,
//       data: newsItem,
//     });

//     this.subscription$.add(
//       this.ref.onClose.subscribe(() => {
//         this.fetch();
//       })
//     );
//   }

//   public paginate(event?): void {
//     this.newsListDisplayed = [];
//     if (event) {
//       this.paginationPage = event.page;

//       let currentIndex = event.page * event.rows;
//       this.newsListDisplayed = this.newsListFiltered.slice(
//         currentIndex,
//         currentIndex + event.rows
//       );
//     } else {
//       let currentIndex = this.paginationPage * this.paginationRows;
//       this.updateCurrentPage(currentIndex);

//       this.newsListDisplayed = this.newsListFiltered.slice(
//         currentIndex,
//         currentIndex + this.paginationRows
//       );
//     }
//   }

//   private fetch() {
//     this.newsService.getNewsList().subscribe((newsListResponse) => {
//       this.newsListOriginal = newsListResponse;
//       this.newsListFiltered = newsListResponse;
//       this.paginate()
//     });
//   }

//   private onChanges(): void {
//     this.subscription$.add(
//       this.filterForm.valueChanges.subscribe((value) => {
//         this.newsListFiltered = this.newsListOriginal.filter(
//           (newsItem) =>
//             newsItem.Title.includes(value.search) ||
//             newsItem.Text.includes(value.search)
//         );
//         this.paginate();
//       })
//     );
//   }

//   private updateCurrentPage(currentPage: number): void {
//     this.paginator.changePage(currentPage);
//   }

//   ngOnDestroy() {
//     if (this.ref) {
//       this.ref.close();
//     }
//     this.subscription$.unsubscribe();
//   }
// }

// import { Paginator } from 'primeng/paginator';
// import { NewsService } from './../../../../shared/services/news.service';
// import { Subscription } from 'rxjs';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';
// import { NewsInterface } from 'src/app/admin/shared/types/news.interface';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { CreateNewsDialogComponent } from '../create-news-dialog/create-news-dialog.component';

// @Component({
//   selector: 'cabinet',
//   templateUrl: './cabinet.component.html',
// })
// export class CabinetComponent implements OnInit {
//   public filterForm: FormGroup;
//   public newsListOriginal: NewsInterface[] = [];
//   public newsListFiltered: NewsInterface[] = [];
//   public newsListDisplayed: NewsInterface[] = [];

//   @ViewChild('paginator', { static: false }) paginator!: Paginator;
//   public paginationPage: number = 0;
//   public paginationRows: number = 10;

//   ref: DynamicDialogRef;

//   private subscription$: Subscription = new Subscription();

//   constructor(
//     private pageStoreService: PageStoreService,
//     private newsService: NewsService,
//     public dialogService: DialogService,
//     private formBuilder: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.pageStoreService.setPage({
//       header: 'Панель Администратора',
//       description: 'Добро пожаловать в панель администратора!',
//     });

//     this.fetch();

//     this.filterForm = this.formBuilder.group({
//       search: '',
//     });

//     this.onChanges();
//   }

//   public handleRemove(newsID: string) {
//     this.subscription$.add(
//       this.newsService.removeNewsItem(newsID).subscribe((removeResponse) => {
//         this.fetch();
//       })
//     );
//   }

//   public openCreateNews(newsItem?: NewsInterface) {
//     this.ref = this.dialogService.open(CreateNewsDialogComponent, {
//       header: 'Создание новости',
//       width: '50%',
//       contentStyle: { 'max-height': '550px', overflow: 'auto' },
//       baseZIndex: 10000,
//       data: newsItem,
//     });

//     this.subscription$.add(
//       this.ref.onClose.subscribe(() => {
//         this.fetch();
//       })
//     );
//   }

//   public paginate(event?): void {
//     this.newsListDisplayed = [];
//     if (event) {
//       this.paginationPage = event.page;

//       let currentIndex = event.page * event.rows;
//       this.newsListDisplayed = this.newsListFiltered.slice(
//         currentIndex,
//         currentIndex + event.rows
//       );
//     } else {
//       let currentIndex = this.paginationPage * this.paginationRows;
//       this.updateCurrentPage(currentIndex);

//       this.newsListDisplayed = this.newsListFiltered.slice(
//         currentIndex,
//         currentIndex + this.paginationRows
//       );
//     }
//   }

//   private fetch() {
//     this.newsService.getNewsList().subscribe((newsListResponse) => {
//       this.newsListOriginal = newsListResponse;
//       this.newsListFiltered = newsListResponse;
//       this.paginate()
//     });
//   }

//   private onChanges(): void {
//     this.subscription$.add(
//       this.filterForm.valueChanges.subscribe((value) => {
//         this.newsListFiltered = this.newsListOriginal.filter(
//           (newsItem) =>
//             newsItem.Title.includes(value.search) ||
//             newsItem.Text.includes(value.search)
//         );
//         this.paginate();
//       })
//     );
//   }

//   private updateCurrentPage(currentPage: number): void {
//     this.paginator.changePage(currentPage);
//   }

//   ngOnDestroy() {
//     if (this.ref) {
//       this.ref.close();
//     }
//     this.subscription$.unsubscribe();
//   }
// }
