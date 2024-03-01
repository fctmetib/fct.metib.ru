import {Component, Input} from '@angular/core'
import {ContactPanelDevice} from './interfaces/contact-panel.interface'

@Component({
	selector: 'mib-contact-panel',
	templateUrl: './contact-panel.component.html',
	styleUrls: ['./contact-panel.component.scss']
})
export class ContactPanelComponent {
	@Input() device: ContactPanelDevice = 'desktop'
	@Input() contactImage: string = ''
	@Input() contactName: string = ''
	@Input() contactPosition: string = ''
	@Input() contactMail: string = ''
	@Input() contactTel: string = ''

	get classes() {
		return {
			[`contract_${this.device}`]: true
		}
	}
}
