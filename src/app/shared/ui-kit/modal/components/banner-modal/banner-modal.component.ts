import {Component, Input} from '@angular/core'
import {BannerModalType} from './interfaces/banner-modal.interface'

@Component({
	selector: 'mib-banner-modal',
	templateUrl: './banner-modal.component.html',
	styleUrls: ['./banner-modal.component.scss']
})
export class BannerModalComponent {
	@Input() type: BannerModalType = 'success'

	// get classes() {
	// 	return {
	// 		[`modal_type-${this.type}`]: true
	// 	}
	// }
}
