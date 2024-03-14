import {Component, Input} from '@angular/core'
import {NewsPanelDevice} from './interfaces/news-panel.interface'

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
	@Input() showPreview: string = ''
	@Input() newsTitle: string = ''
	@Input() newsDate: string = ''
	@Input() altText: string = ''

	get classes() {
		return {
			[`news_vertical`]: !this.vertical,
			[`news_showPreview`]: this.showPreview
		}
	}
}
