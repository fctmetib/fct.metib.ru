import {Component, Input} from '@angular/core'
import {Toaster} from './interfaces/toaster.interface'
import {ToasterService} from '../../services/common/toaster.service'

@Component({
	selector: 'mib-toaster',
	templateUrl: './toaster.component.html',
	styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
	@Input() showDescription: boolean
	@Input() contrast: boolean
	toasts: Toaster[] = []

	constructor(private toaster: ToasterService) {}

	ngOnInit() {
		this.toaster.toast$.subscribe(toast => {
			this.toasts = [toast, ...this.toasts]
			setTimeout(() => this.toasts.pop(), toast.delay || 4000)
		})
	}

	remove(index: number) {
		this.toasts = this.toasts.filter((_, i) => i !== index)
	}
}
1
