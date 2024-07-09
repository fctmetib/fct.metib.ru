import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
	selector: 'mib-rate-item',
	templateUrl: './rate-item.component.html',
	styleUrls: ['./rate-item.component.scss']
})
export class RateItemComponent {
	@Input() title: string = ''
	@Input() content: string = ''
	@Output() onRate = new EventEmitter()
}
