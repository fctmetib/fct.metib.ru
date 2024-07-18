import {Component, OnDestroy, OnInit} from '@angular/core'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {ProductTabsEnum} from './enums/landing.enum'
import {NewsService} from '../../service/news.service'
import {
	BehaviorSubject,
	Subscription,
	finalize,
	map,
	switchMap,
	tap,
	zip
} from 'rxjs'
import {AdvancedNewsInterface, NewsInterface} from '../../type/news.interface'
import {Properties} from 'csstype'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'mib-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
	public ProductTabsEnum = ProductTabsEnum

	maxPage: number = 3
	progress: number = 2

	public iconsDatas = [
		{
			id: 1,
			icon: 'fi_shield',
			// icon: 'fi_clipboard',
			title: 'Надежно',
			text: 'Отсутствие риска неоплаты со стороны дебитора'
		},
		{
			id: 2,
			icon: 'fi_copy',
			title: 'Прозрачно',
			text: 'Тарифные планы без скрытых комиссий или платежей'
		},
		{
			id: 3,
			icon: 'fi_clipboard',
			// icon: 'fi_shield',
			title: 'Без залога',
			text: 'Для оформления не требуется залог, нужна только поставка'
		},
		{
			id: 4,
			icon: 'fi_twitter',
			title: 'Без ограничений',
			text: 'Полученные деньги можно тратить на любые цели'
		}
	]

	public partnersLogo = [
		{name: 'X5Group', img: './assets/images/staff/partners/X5Group 2.svg'},
		{name: 'Ozon', img: './assets/images/staff/partners/OZON_2019 2.svg'},
		{name: 'Obi', img: './assets/images/staff/partners/Obi.svg'},
		{name: 'Mvideo', img: './assets/images/staff/partners/Mvideo 2.svg'},
		{name: 'Metro', img: './assets/images/staff/partners/Logo_METRO 2.svg'},
		{
			name: 'Megafone',
			img: './assets/images/staff/partners/MegaFon_logo 2.svg'
		},
		{name: 'MTS', img: './assets/images/staff/partners/MTC_Logo_RGB 2.svg'},
		{
			name: 'LeroyMerlin',
			img: './assets/images/staff/partners/Leroy_Merlin 2.svg'
		},
		{name: 'Lenta', img: './assets/images/staff/partners/Lenta.svg'},
		{name: 'Lamoda', img: './assets/images/staff/partners/Lamoda_logo 2.svg'},
		{name: 'Familia', img: './assets/images/staff/partners/Familia.svg'},
		{name: 'more', img: './assets/images/staff/partners/more.svg'}
	]

	newsDatas = [
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
		}
	]

	public loading$ = new BehaviorSubject<boolean>(false)
	public newsNumberCount: number = 4
	public getAdvancedNews: AdvancedNewsInterface[]
	public imgNumber: number = 0

	public currentProductsTab?: ProductTabsEnum

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '1136px',
		height: '509px',
		margin: '0 auto'
	}

	public mobileSkeleton: Properties = {
		borderRadius: '8px',
		width: 'calc(100% - 32px)',
		height: '262px',
		margin: '0 16px'
	}

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(
		private newsService: NewsService,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit(): void {
		// this.getCurrentNews()
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
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
							// console.log('data :>> ', data)
						})
					)
				),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}

	public getFunding() {
		console.log('get funding')
	}

	public onChange($num) {
		this.imgNumber = $num
		this.currentProductsTab = $num
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
