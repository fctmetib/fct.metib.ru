import {Component, Input} from '@angular/core'
import {ToasterType} from '../../interfaces/toaster-point.interface'
import {ToasterDevice} from '../../interfaces/toaster-point.interface'

@Component({
	selector: 'mib-toaster-point',
	templateUrl: './toaster-point.component.html',
	styleUrls: ['./toaster-point.component.scss']
})
export class ToasterPointComponent {
	@Input() type: ToasterType = 'success'
	@Input() device: ToasterDevice = 'desktop'
	@Input() description: boolean = true
	@Input() showDescription: boolean = true

	get classes() {
		return {
			[`toaster_type-${this.type}`]: true,
			[`toaster_device-${this.device}`]: true
		}
	}

	get IconName() {
		let icon = ''
		switch (this.type) {
			case 'success':
				icon = 'fi_check'
				break
			case 'default':
				icon = 'fi_info'
				break
			case 'failure':
				icon = 'fi_alert-octagon'
				break
			default:
				icon = 'fi_info'
		}
		return icon
	}
}
