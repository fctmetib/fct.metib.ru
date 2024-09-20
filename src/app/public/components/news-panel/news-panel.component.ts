import { isPlatformBrowser } from '@angular/common'
import {Component, EventEmitter, Inject, Input, Output, PLATFORM_ID} from '@angular/core'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'

@Component({
	selector: 'mib-news-panel',
	templateUrl: './news-panel.component.html',
	styleUrls: ['./news-panel.component.scss']
})
export class NewsPanelComponent {
	@Input() vertical: boolean = true
	@Input() superHero: boolean = false
	@Input() showLink: boolean = false
	@Input() linkText: string = ''
	@Input() link: string = ''
	@Input() showCategories: boolean = false
	@Input() isAdmin: boolean = false
	@Input() showPreview: string = ''
	@Input() newsTitle: string = ''
	@Input() newsDate: string = ''
	@Input() altText: string = ''
	@Output() onclick = new EventEmitter()
	@Output() edit = new EventEmitter()
	@Output() delete = new EventEmitter()

	@Input() set newsText(value: string) {
		if (isPlatformBrowser(this.platformId)) {
		  this.newsContent = this.sanitizer.bypassSecurityTrustHtml(value);
		} else {
		  // Обработка для сервера, если необходимо
		  this.newsContent = value;
		}
	  }

	newsContent: SafeHtml

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private sanitizer: DomSanitizer
	  ) {}

	get classes() {
		return {
			[`news_vertical`]: this.vertical,
			[`news_superhero`]: this.superHero,
			[`news_showPreview`]: this.showPreview
		}
	}
}
