import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
	selector: 'mib-news-panel',
	templateUrl: './news-panel.component.html',
	styleUrls: ['./news-panel.component.scss']
})
export class NewsPanelComponent {
	@Input() vertical: boolean = true
	@Input() linkText: string = ''
	@Input() link: string = ''
	@Input() showCategories: boolean = false
	@Input() isAdmin: boolean = false
	@Input() showPreview: string = ''
	@Input() newsTitle: string = ''
	@Input() newsDate: string = ''
	@Input() altText: string = ''
	@Output() edit = new EventEmitter()
	@Output() delete = new EventEmitter()

	get classes() {
		return {
			[`news_vertical`]: !this.vertical,
			[`news_showPreview`]: this.showPreview
		}
	}
}
