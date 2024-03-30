import {Component} from '@angular/core'
import {BehaviorSubject, finalize, map, switchMap, tap, zip} from 'rxjs'
import {AdvancedNewsInterface} from '../../type/news.interface'
import {NewsService} from '../../service/news.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {ActivatedRoute, Router} from '@angular/router'
import {Properties} from 'csstype'

@Component({
	selector: 'mib-single-news',
	templateUrl: './single-news.component.html',
	styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent {
	public imageSrc: string = './assets/images/news/news-2.jpg'

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '560px',
		height: '315px',
		margin: '0 auto'
	}

	public loading$ = new BehaviorSubject<boolean>(false)
	public newsNumberCount: number = 5
	public getSingleNews: AdvancedNewsInterface[]

	constructor(
		private newsService: NewsService,
		public toolsService: ToolsService,
		private route: ActivatedRoute
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
							const id = Number(this.route.snapshot.paramMap.get('id'))
							this.getSingleNews = data.filter(el => el.ID === id)
						})
					)
				),
				finalize(() => this.loading$.next(false))
			)
			.subscribe()
	}
}
