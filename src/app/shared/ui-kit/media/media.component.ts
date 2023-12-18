import { Component, Input } from '@angular/core'
import { MediaType } from './interfaces/media.interface'

@Component({
	selector: 'mib-media',
	templateUrl: './media.component.html',
	styleUrls: ['./media.component.scss']
})
export class MediaComponent {
	@Input() type: MediaType = 'telegram'

	get classes() {
		return {
			[`media_type-${this.type}`]: true
		}
	}

	get IconName() {
		let icon = ''
		switch (this.type) {
			case 'telegram':
				icon = 'telegram'
				break
			case 'whatsapp':
				icon = 'whatsapp'
				break
			case 'vk':
				icon = 'vk'
				break
		}
		return icon
	}
}
