import {Component, OnDestroy, OnInit} from '@angular/core'
import {
	BehaviorSubject,
	finalize,
	map,
	Subscription,
	switchMap,
	tap,
	zip
} from 'rxjs'
import {AdvancedNewsInterface} from '../../type/news.interface'
import {NewsService} from '../../service/news.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {ActivatedRoute, Router} from '@angular/router'
import {Properties} from 'csstype'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'

@Component({
	selector: 'mib-single-news',
	templateUrl: './single-news.component.html',
	styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent implements OnInit, OnDestroy {
	public imageSrc: string = './assets/images/news/news-2.jpg'

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '560px',
		height: '315px',
		margin: '0 auto'
	}

	public mobileSkeleton: Properties = {
		borderRadius: '8px',
		width: 'calc(100% - 32px)',
		height: '262px',
		margin: '0 16px'
	}

	public loading$ = new BehaviorSubject<boolean>(false)
	public newsNumberCount: number = 5
	public getSingleNews: AdvancedNewsInterface[]

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	newsContent: SafeHtml

	constructor(
		private newsService: NewsService,
		public toolsService: ToolsService,
		private route: ActivatedRoute,
		public breakpointService: BreakpointObserverService,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		this.getCurrentNews()
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	public getCurrentNews() {
		this.loading$.next(true)

		const id = this.route.snapshot.paramMap.get('id')

		if (!id) {
			this.loading$.next(false)
			return
		}

		this.newsService
			.getNewsById(id)
			.pipe(
				switchMap(news =>
					this.newsService
						.getNewsImage(news.ID)
						.pipe(map(image => ({...news, Image: image})))
				),
				tap(news => {
					this.getSingleNews = [news]
					this.newsContent = this.sanitizer.bypassSecurityTrustHtml(
						this.getSingleNews[0].Text
					)
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe({
				error: err => {
					console.error('Error fetching news or image', err)
					this.loading$.next(false)
				}
			})
	}

	get hasNews(): boolean {
		return this.getSingleNews && Object.keys(this.getSingleNews).length > 0
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
