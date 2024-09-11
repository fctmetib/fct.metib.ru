import {Component, OnDestroy, OnInit} from '@angular/core'
import {NewsService} from '../../service/news.service'
import {
	BehaviorSubject,
	catchError,
	finalize,
	map,
	of,
	Subscription,
	switchMap,
	tap,
	zip
} from 'rxjs'
import {AdvancedNewsInterface} from '../../type/news.interface'
import {Properties} from 'csstype'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'news',
	styleUrls: ['./news.component.scss'],
	templateUrl: 'news.component.html'
})
export class NewsComponent implements OnInit, OnDestroy {
	datas = [
		{
			id: 1,
			img: './assets/images/news/news-1.jpg',
			title: 'С Наступающим Новым 2024 годом!',
			date: '10 декабря 2023',
			link: '/news/1'
		},
		{
			id: 2,
			img: './assets/images/news/news-2.jpg',
			title: 'ПАО АКБ "Металлинвестбанк" посетил выставки',
			date: '12 декабря 2023',
			link: '/news/2'
		},
		{
			id: 3,
			img: './assets/images/news/news-3.jpg',
			title: 'Прямое финансирование Китайского Экспорта',
			date: '14 декабря 2023',
			link: '/news/3'
		},
		{
			id: 4,
			img: './assets/images/news/news-4.jpg',
			title: 'ПАО АКБ «Металлинвестбанк» договорился о работе с ТС Вимос',
			date: '15 декабря 2023',
			link: '/news/4'
		},
		{
			id: 5,
			img: './assets/images/news/news-5.jpg',
			title: 'ПАО АКБ «Металлинвестбанк» на Выставке «Кредит-Expo»',
			date: '18 декабря 2023',
			link: '/news/5'
		}
	]

	public defaultSkeleton: Properties = {
		width: '100%',
		borderRadius: '8px',
		marginBottom: '16px',
		height: '313px'
	}

	public defaultMinSkeleton: Properties = {
		width: '100%',
		borderRadius: '8px',
		marginBottom: '16px',
		height: '134px'
	}

	public skeleton: Properties = {
		...this.defaultSkeleton
	}

	public loading$ = new BehaviorSubject<boolean>(false)
	public newsNumberCount: number = 5
	public getAdvancedNews: AdvancedNewsInterface[]

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(
		private newsService: NewsService,
		public toolsService: ToolsService,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit(): void {
		this.getCurrentNews()
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	public getCurrentNews() {
		this.loading$.next(true)
		this.newsService
			.getNews(this.newsNumberCount)
			.pipe(
				tap(news => {
					if (!news || news.length === 0) {
						throw new Error('No news available')
					}
				}),
				switchMap(news =>
					zip(
						news.map(item =>
							this.newsService.getNewsImage(item.ID).pipe(
								map(image => ({...item, Image: image})),
								catchError(error => {
									console.error('Error fetching image:', error)
									return of({
										...item,
										Image: 'assets/images/Image_not_available.png'
									})
								})
							)
						)
					).pipe(
						tap(data => {
							this.getAdvancedNews = data
						})
					)
				),
				catchError(error => {
					console.error('Error fetching news:', error)
					return of([])
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe({
				error: err => console.error('Error in subscription:', err)
			})
	}

	get hasNews(): boolean {
		return this.getAdvancedNews && this.getAdvancedNews.length > 0
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
