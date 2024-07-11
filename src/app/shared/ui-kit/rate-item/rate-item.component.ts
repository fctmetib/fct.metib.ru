import {Component, EventEmitter, Input, Output} from '@angular/core'
import {RateItemDevice} from './interfaces/rate-item.interface'
import {animate, state, style, transition, trigger} from '@angular/animations'

@Component({
	selector: 'mib-rate-item',
	templateUrl: './rate-item.component.html',
	styleUrls: ['./rate-item.component.scss'],
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
		]),
		trigger('rotate', [
			state('default', style({transform: 'rotate(0deg)'})),
			state('rotated', style({transform: 'rotate(180deg)'})),
			transition('default <=> rotated', animate('300ms ease-in-out'))
		])
	]
})
export class RateItemComponent {
	@Input() device: RateItemDevice = 'desktop'
	@Input() title: string = ''
	@Input() content: string = ''
	@Output() onRate = new EventEmitter()

	public extended: boolean = false

	get classes() {
		return {
			[`rate_${this.device}`]: true
		}
	}
}
