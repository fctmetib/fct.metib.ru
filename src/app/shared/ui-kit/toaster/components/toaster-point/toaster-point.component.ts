import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	Inject,
	Input,
	OnInit,
	PLATFORM_ID
} from '@angular/core'
import {ToasterPointType} from '../../interfaces/toaster-point.interface'
import {ToasterPointDevice} from '../../interfaces/toaster-point.interface'
import {isPlatformBrowser} from '@angular/common'

@Component({
	selector: 'mib-toaster-point',
	templateUrl: './toaster-point.component.html',
	styleUrls: ['./toaster-point.component.scss']
})
export class ToasterPointComponent implements AfterViewInit, OnInit {
	private mutationObserver: MutationObserver

	@Input() set type(value: ToasterPointType) {
		this._type = value
	}
	@Input() set device(value: ToasterPointDevice) {
		this._device = this.device
	}

	@Input() showDescription: boolean = true

	public _type: ToasterPointType = 'success'
	public _device: ToasterPointDevice = 'desktop'

	public classes: {[key: string]: boolean} = {}

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.updateClasses()
	}

	ngAfterViewInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.initMutationObserver()
			this.cdr.detectChanges()
		}
	}

	private initMutationObserver() {
		this.mutationObserver = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.type === 'childList') {
					// Вызови здесь метод, который обновляет классы
					this.updateClasses()
				}
			})
		})
	}

	updateClasses() {
		this.classes = {
			[`toaster-point_type-${this.type}`]: true,
			[`toaster-point_device-${this.device}`]: true
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
