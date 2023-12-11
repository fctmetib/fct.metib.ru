import { AfterViewInit, Component, Input } from '@angular/core'
import { DeviceType } from '../../interfaces/shared.interface'
import { OpacityViewAnimation } from '../../animations/animations'

@Component({
	selector: 'mib-new-demand',
	templateUrl: './new-demand.component.html',
	styleUrls: ['./new-demand.component.scss'],
	animations: [OpacityViewAnimation]
})
export class NewDemandComponent implements AfterViewInit {
	@Input() device: DeviceType = 'desktop'
	@Input() demandTitle: string
	@Input() demandText: string
	@Input() historyNumber: string
	@Input() link?: string

	public isHover: boolean = false
	public viewMounted: boolean = false

	get classes() {
		return {
			[`new-demand_${this.device}`]: true
		}
	}

	ngAfterViewInit() {
		this.viewMounted = true
	}
}
