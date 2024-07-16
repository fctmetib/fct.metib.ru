import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output
} from '@angular/core'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from '../../services/common/breakpoint-observer.service'
import {animate, state, style, transition, trigger} from '@angular/animations'
import {RateCardInterface} from './interfaces/rate-card.interface'

@Component({
	selector: 'mib-rate-card',
	templateUrl: './rate-card.component.html',
	styleUrls: ['./rate-card.component.scss'],
	animations: [
		trigger('slideInOut', [
			state(
				'in',
				style({
					height: '*',
					opacity: 1,
					display: 'flex'
				})
			),
			state(
				'out',
				style({
					height: '0px',
					opacity: 0,
					display: 'none'
				})
			),
			transition('in => out', animate('400ms ease-in-out')),
			transition('out => in', animate('400ms ease-in-out'))
		])
	]
})
export class RateCardComponent implements OnInit, OnDestroy {
	@Input() title: string
	@Input() description: string
	@Input() features: string[]
	@Input() extras: {title: string; tariff: string}[]
	@Output() onRate = new EventEmitter()

	extended: boolean = false

	public isDesktop: boolean = false
	private subscriptions = new Subscription()

	constructor(public breakpointService: BreakpointObserverService) {}

	get classes() {
		return {
			[`rate_${this.isDesktop ? 'desktop' : 'mobile'}`]: true
		}
	}

	ngOnInit() {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
