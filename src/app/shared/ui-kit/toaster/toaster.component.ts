import {Component, Input} from '@angular/core'
import {ToasterDevice, ToasterType} from './interfaces/toaster.interface'

@Component({
	selector: 'mib-toaster',
	templateUrl: './toaster.component.html',
	styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
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
