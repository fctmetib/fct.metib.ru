import {animate, state, style, transition, trigger} from '@angular/animations'
import {Component, Input} from '@angular/core'
import {AccordionItemDevice} from './interfaces/accordion-item.interface'

@Component({
	selector: 'mib-accordion-item',
	templateUrl: './accordion-item.component.html',
	styleUrls: ['./accordion-item.component.scss'],
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
export class AccordionItemComponent {
	@Input() device: AccordionItemDevice = 'desktop'
	@Input() question: string = 'test question'
	@Input() answer: string = 'this is answer'

	public extended: boolean = false

	get classes() {
		return {
			[`accordion_${this.device}`]: true
		}
	}
}
