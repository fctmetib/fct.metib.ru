import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	Input
} from '@angular/core'
import { DeviceType } from '../../interfaces/shared.interface'
import { OpacityViewAnimation } from '../../animations/animations'

@Component({
	selector: 'mib-cash-panel',
	templateUrl: './cash-panel.component.html',
	styleUrls: ['./cash-panel.component.scss'],
	animations: [OpacityViewAnimation]
})
export class CashPanelComponent implements AfterViewInit {
	@Input() device: DeviceType = 'desktop'
	@Input() panelTitle: string
	@Input() panelData: string
	@Input() link?: string

	public isHover: boolean = false
	public viewMounted: boolean = false

	get classes() {
		return {
			[`cash-panel_${this.device}`]: true
		}
	}

	ngAfterViewInit() {
		this.viewMounted = true
	}
}
