import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core'
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
import {ActivatedRoute, Router} from '@angular/router'
import {Properties} from 'csstype'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {
	DomSanitizer,
	makeStateKey,
	SafeHtml,
	TransferState
} from '@angular/platform-browser'
import {isPlatformBrowser, isPlatformServer} from '@angular/common'
const NEWS_KEY = makeStateKey<AdvancedNewsInterface[]>('news');

@Component({
  selector: 'mib-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent implements OnInit, OnDestroy {
  public defaultSkeleton: Properties = {
    borderRadius: '8px',
    width: '560px',
    height: '315px',
    margin: '0 auto'
  };

  public mobileSkeleton: Properties = {
    borderRadius: '8px',
    width: 'calc(100% - 32px)',
    height: '262px',
    margin: '0 16px'
  };

  public loading$ = new BehaviorSubject<boolean>(true);
  public newsNumberCount: number = 5;
  public getSingleNews: AdvancedNewsInterface[];

  public isDesktop: boolean = false;
  public isBrowser: boolean;

  private subscriptions = new Subscription();

  newsContent: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    public breakpointService: BreakpointObserverService
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.subscriptions.add(
        this.breakpointService.isDesktop().subscribe(b => (this.isDesktop = b))
      );
    }

    this.getCurrentNews();
  }

  public getCurrentNews() {
	console.log('getCurrentNews called');
	const savedNews = this.transferState.get<AdvancedNewsInterface[]>(NEWS_KEY, null);
	console.log('savedNews:', savedNews);

    if (savedNews) {
      this.getSingleNews = savedNews;
      this.transferState.remove(NEWS_KEY);
      this.processNewsContent();
      this.loading$.next(false);
    } else {
		const routeData = this.route.snapshot.data['newsData'] as AdvancedNewsInterface[];
    	console.log('routeData:', routeData);

      if (routeData && routeData.length > 0) {
        this.getSingleNews = routeData;

        // Сохраняем данные в TransferState на сервере
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(NEWS_KEY, this.getSingleNews);
        }

        this.processNewsContent();
        this.loading$.next(false);
      } else {
		console.warn('No data received from Resolver');
        // Обработка ситуации, когда данных нет
        this.getSingleNews = [];
        this.loading$.next(false);
      }
    }
  }

  private processNewsContent() {
    if (this.getSingleNews[0] && this.getSingleNews[0].Text) {
      this.newsContent = this.isBrowser
        ? this.sanitizer.bypassSecurityTrustHtml(this.getSingleNews[0].Text)
        : this.getSingleNews[0].Text;
    }
  }

  get hasNews(): boolean {
    return this.getSingleNews && this.getSingleNews.length > 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
