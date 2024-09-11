import {Component, Input} from '@angular/core'
import {MediaSize, MediaType} from './interfaces/media.interface'

@Component({
	selector: 'mib-media',
	templateUrl: './media.component.html',
	styleUrls: ['./media.component.scss']
})
export class MediaComponent {
	@Input() type: MediaType = 'telegram'
	@Input() size: MediaSize = 'm'
	link: string = ''

	get classes() {
		return {
			[`media_type-${this.type}`]: true,
			[`media_size-${this.size}`]: true
		}
	}

	get IconName() {
		let icon = ''
		switch (this.type) {
			case 'telegram':
				icon = 'telegram'
				this.link = 'https://t.me/factoring_metib'
				break
			case 'whatsapp':
				icon = 'whatsapp'
				this.link = 'https://wa.me/79259508870'
				break
			case 'vk':
				icon = 'vk'
				this.link = 'https://vk.com/factoring.metib'
				break
		}
		return icon
	}
}
