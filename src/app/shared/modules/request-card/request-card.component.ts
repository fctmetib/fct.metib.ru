import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core'
import {DeviceType} from '../../interfaces/shared.interface'
import {OpacityViewAnimation} from '../../animations/animations'
import {BreakpointObserverService} from '../../services/common/breakpoint-observer.service'
import {Subscription} from 'rxjs'

@Component({
	selector: 'mib-request-card',
	templateUrl: './request-card.component.html',
	styleUrls: ['./request-card.component.scss'],
	animations: [OpacityViewAnimation]
})
export class RequestCardComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() device: DeviceType = 'desktop'
	@Input() requestTitle: string
	@Input() requestText: string
	// @Input() requestQuantity: number
	@Input() link?: string

	public isHover: boolean = false
	public viewMounted: boolean = false
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(public breakpointService: BreakpointObserverService) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	get classes() {
		return {
			[`request-card_${this.isDesktop ? 'desktop' : 'mobile'}`]: true
		}
	}

	ngAfterViewInit() {
		this.viewMounted = true
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
