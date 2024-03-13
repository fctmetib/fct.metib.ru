import {Component, OnInit} from '@angular/core'
import {NewsService} from '../../service/news.service'
import {BehaviorSubject, finalize, map, switchMap, tap, zip} from 'rxjs'
import {AdvancedNewsInterface} from '../../type/news.interface'
import {Properties} from 'csstype'
import {ToolsService} from 'src/app/shared/services/tools.service'

@Component({
	selector: 'news',
	styleUrls: ['./news.component.scss'],
	templateUrl: 'news.component.html'
})
export class NewsComponent implements OnInit {
	datas = [
		{
			id: 1,
			img: './assets/images/news/news-1.jpg',
			title: 'С Наступающим Новым 2024 годом!',
			date: '10 декабря 2023',
			link: '/news'
		},
		{
			id: 2,
			img: './assets/images/news/news-2.jpg',
			title: 'ПАО АКБ "Металлинвестбанк" посетил выставки',
			date: '12 декабря 2023',
			link: '/news'
		},
		{
			id: 3,
			img: './assets/images/news/news-3.jpg',
			title: 'Прямое финансирование Китайского Экспорта',
			date: '14 декабря 2023',
			link: '/news'
		},
		{
			id: 4,
			img: './assets/images/news/news-4.jpg',
			title: 'ПАО АКБ «Металлинвестбанк» договорился о работе с ТС Вимос',
			date: '15 декабря 2023',
			link: '/news'
		},
		{
			id: 5,
			img: './assets/images/news/news-5.jpg',
			title: 'ПАО АКБ «Металлинвестбанк» на Выставке «Кредит-Expo»',
			date: '18 декабря 2023',
			link: '/news'
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

	constructor(
		private newsService: NewsService,
		public toolsService: ToolsService
	) {}

	ngOnInit(): void {
		this.getCurrentNews()
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
}

// import { environment } from 'src/environments/environment';
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { NewsService } from '../../service/news.service';
// import { NewsInterface } from '../../type/news.interface';
// import { Title } from '@angular/platform-browser';

// @Component({
//   selector: 'news',
//   styleUrls: ['./news.component.scss'],
//   templateUrl: 'news.component.html',
// })
// export class NewsComponent implements OnInit, OnDestroy {
//   private subscription$: Subscription = new Subscription();

//   public imageSrc = '';
//   public currentNews: NewsInterface;

//   constructor(
//     private readonly activatedRoute: ActivatedRoute,
//     private readonly newsService: NewsService,
//     private readonly titleService: Title
//   ) { }

//   public ngOnInit(): void {
//     let id = this.activatedRoute.snapshot.params.id;
//     this.subscription$.add(
//       this.newsService.getNewsById(id).subscribe((newsResponse: NewsInterface): void => {
//         this.titleService.setTitle(newsResponse.Title);
//         this.currentNews = newsResponse;
//         this.imageSrc = `${environment.apiUrl}/news/${this.currentNews.ID}/image`;
//       })
//     );
//   }

//   public ngOnDestroy(): void {
//     this.subscription$.unsubscribe();
//   }
// }
