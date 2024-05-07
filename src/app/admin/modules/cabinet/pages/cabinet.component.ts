import {
	BehaviorSubject,
	filter,
	finalize,
	map,
	switchMap,
	takeUntil,
	tap,
	zip
} from 'rxjs'
import {Component, OnInit} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {CabinetNewsDrawerService} from '../modules/cabinet-news-drawer/cabinet-news-drawer.service'
import {CabinetCreateNewsDrawerService} from '../modules/cabinet-create-news-drawer/cabinet-create-news-drawer.service'
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
	}

	onPageChange(page: number) {
		this.currentPage$.next(page)
		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE
		console.log('startIndex :>> ', startIndex)
		console.log('endIndex :>> ', endIndex)
		this.dispalyNews$.next(this.getSortedNews.slice(startIndex, endIndex))
	}

	public getCurrentNews() {
		this.loading$.next(true)
		this.newsService
			.getAllNews()
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
							this.getSortedNews = data
							this.onPageChange(this.currentPage$.value)
						})
					)
				),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	sortNewsByDate(order: 'new' | 'old') {
		if (this.getSortedNews) {
			const temp = [...this.getSortedNews]
			if (order === 'new') {
				this.getSortedNews = temp.sort(
					(a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
				)
				this.dispalyNews$.next(this.getSortedNews)
				this.onPageChange(this.currentPage$.value)
			} else if (order === 'old') {
				this.getSortedNews = temp.sort(
					(a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
				)
				this.dispalyNews$.next(this.getSortedNews)
				this.onPageChange(this.currentPage$.value)
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
}
