import {animate, state, style, transition, trigger} from '@angular/animations'
import {Component, Input} from '@angular/core'
import { AccordionItemDevice } from '../accordion-item/interfaces/accordion-item.interface';

@Component({
	selector: 'mib-accordion-with-shadow',
	templateUrl: './accordion-with-shadow.component.html',
	styleUrls: ['./accordion-with-shadow.component.scss'],
	animations: [
		trigger('slideInOut', [
			state(
				'in',
				style({
					height: '*',
					opacity: 1
				})
			),
			state(
				'out',
				style({
					height: '0px',
					opacity: 0
				})
			),
			transition('in => out', animate('400ms ease-in-out')),
			transition('out => in', animate('400ms ease-in-out'))
		])
	]
})
export class AccordionWithShadowComponent {
	@Input() device: AccordionItemDevice = 'desktop'
	@Input() basic: boolean = false

	public extended: boolean = false

	get classes() {
		return {
			[`accordion_${this.device}`]: true,
			[`accordion_basic`]: this.basic
		}
	}
}
