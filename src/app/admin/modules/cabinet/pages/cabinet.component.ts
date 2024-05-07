import {Paginator} from 'primeng/paginator'
import {
	BehaviorSubject,
	Observable,
	Subscription,
	filter,
	finalize,
	from,
	map,
	of,
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
	public dispalyNews$ = new BehaviorSubject<AdvancedNewsInterface[]>([])
	isAdmin: boolean = true

	newsDatas = {
		id: 1,
		img: './assets/images/news/news-1.jpg',
		title: 'С Наступающим Новым 2024 годом!',
		date: '10 декабря 2023',
		link: '/news/1'
	}

	public newsNumberCount: number = 6
	public getAdvancedNews: AdvancedNewsInterface[]
	public getSortedNews: AdvancedNewsInterface[]

	public skeleton: Properties = {
		borderRadius: '8px',
		height: '240px',
		width: '100%'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

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

		// get news start
		this.newsService.getAllNews().subscribe(data => {
			console.log('data News all:>> ', data)
		})
		// get news end
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
							this.onPageChange(this.currentPage$.value)
							console.log('data :>> ', data)
							this.dispalyNews$.next(this.getAdvancedNews)
						})
					)
				),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	sortNewsByDate(order: 'new' | 'old') {
		if (this.getAdvancedNews) {
			const temp = [...this.getAdvancedNews]
			if (order === 'new') {
				this.getSortedNews = temp.sort(
					(a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
				)
				this.dispalyNews$.next(this.getSortedNews)
			} else if (order === 'old') {
				this.getSortedNews = temp.sort(
					(a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
				)
				this.dispalyNews$.next(this.getSortedNews)
			}
		}
	}

	subscribeToDialogClose(dialogRef: MatDialogRef<any>) {
		dialogRef
			.afterClosed()
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
		this.newsService.removeNewsItem(id).subscribe(() => {
			this.getCurrentNews()
		})
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

	onPageChange(page: number) {
		console.log('page HALO:>> ', page)
		this.currentPage$.next(page)
		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		console.log('this.currentPage$:>> ', this.currentPage$.value)
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
