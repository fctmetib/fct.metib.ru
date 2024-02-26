import {AfterViewInit, Component, Input} from '@angular/core'
import {DeviceType} from '../../interfaces/shared.interface'
import {OpacityViewAnimation} from '../../animations/animations'

@Component({
	selector: 'mib-request-card',
	templateUrl: './request-card.component.html',
	styleUrls: ['./request-card.component.scss'],
	animations: [OpacityViewAnimation]
})
export class RequestCardComponent implements AfterViewInit {
	@Input() device: DeviceType = 'desktop'
	@Input() requestTitle: string
	@Input() requestText: string
	// @Input() requestQuantity: number
	@Input() link?: string

	public isHover: boolean = false
	public viewMounted: boolean = false

	get classes() {
		return {
			[`request-card_${this.device}`]: true
		}
	}

	ngAfterViewInit() {
		this.viewMounted = true
	}
}
