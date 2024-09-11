import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit
} from '@angular/core'
import {DeviceType} from '../../interfaces/shared.interface'
import {OpacityViewAnimation} from '../../animations/animations'
import {BreakpointObserverService} from '../../services/common/breakpoint-observer.service'
import {Subscription} from 'rxjs'

@Component({
	selector: 'mib-cash-panel',
	templateUrl: './cash-panel.component.html',
	styleUrls: ['./cash-panel.component.scss'],
	animations: [OpacityViewAnimation]
})
export class CashPanelComponent implements OnInit, OnDestroy {
	@Input() device: DeviceType = 'desktop'
	@Input() panelTitle: string
	@Input() panelData: number
	@Input() panelTerm: string
	@Input() link: string
	@Input() extracted: boolean = false
	@Input() accent: boolean = false

	// public isHover: boolean = false
	// public viewMounted: boolean = false
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(public breakpointService: BreakpointObserverService) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	// ngAfterViewInit() {
	// 	this.viewMounted = true
	// }

	get classes() {
		return {
			[`cash-panel_${this.isDesktop ? 'desktop' : 'mobile'}`]: true
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
