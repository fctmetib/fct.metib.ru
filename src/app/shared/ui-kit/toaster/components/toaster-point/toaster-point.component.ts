import {Component, EventEmitter, Input, Output} from '@angular/core'
import {ToasterPointType} from '../../interfaces/toaster-point.interface'
import {ToasterPointDevice} from '../../interfaces/toaster-point.interface'
import {Toaster} from '../../interfaces/toaster.interface'

@Component({
	selector: 'mib-toaster-point',
	templateUrl: './toaster-point.component.html',
	styleUrls: ['./toaster-point.component.scss']
})
export class ToasterPointComponent {
	@Input() device: ToasterPointDevice = 'desktop'
	@Input() showDescription: boolean = true
	@Input() contrast: boolean = true
	@Input() toast: Toaster
	@Input() i: number

	@Output() remove = new EventEmitter<number>()

	constructor() {}

	get classes() {
		return {
			[`toaster-point_device-${this.device}`]: true,
			'toaster-point_contrast': this.contrast
		}
	}

	get IconName() {
		let icon = ''
		switch (this.toast.type) {
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
