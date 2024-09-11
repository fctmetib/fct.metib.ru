import {Component, EventEmitter, Input, Output} from '@angular/core'
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
		this.newsContent = this.sanitizer.bypassSecurityTrustHtml(value)
	}

	newsContent: SafeHtml

	constructor(private sanitizer: DomSanitizer) {}

	get classes() {
		return {
			[`news_vertical`]: this.vertical,
			[`news_superhero`]: this.superHero,
			[`news_showPreview`]: this.showPreview
		}
	}
}
