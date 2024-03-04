import {Component, Input} from '@angular/core'
import {NewsPanelDevice} from './interfaces/news-panel.interface'

@Component({
	selector: 'mib-news-panel',
	templateUrl: './news-panel.component.html',
	styleUrls: ['./news-panel.component.scss']
})
export class NewsPanelComponent {
	@Input() device: NewsPanelDevice = 'desktop'
	@Input() vertical: boolean = true
	@Input() showLink: boolean = false
	@Input() showCategories: boolean = false
	@Input() showPreview: boolean = true
	@Input() newsDate: string = ''

	get classes() {
		return {
			[`news_${this.device}`]: true
		}
	}
}
