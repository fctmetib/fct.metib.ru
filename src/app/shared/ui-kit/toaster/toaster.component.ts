import {Component, Input} from '@angular/core'
import {Toaster} from './interfaces/toaster.interface'
import {ToasterService} from '../../services/common/toaster.service'
import {ToasterPointDevice} from './interfaces/toaster-point.interface'

@Component({
	selector: 'mib-toaster',
	templateUrl: './toaster.component.html',
	styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
	@Input() showDescription: boolean = true
	toasts: Toaster[] = []

	constructor(private toaster: ToasterService) {}

	ngOnInit() {
		this.toaster.toast$.subscribe(toast => {
			this.toasts = [toast, ...this.toasts]
			setTimeout(() => this.toasts.pop(), toast.delay || 6000)
		})
	}

	remove(index: number) {
		this.toasts = this.toasts.filter((_, i) => i !== index)
		console.log('index :>> ', index)
	}
}
