import { animate, style, transition, trigger } from '@angular/animations'
import { Component, Input, ViewEncapsulation, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { MibRadioSize } from './interfaces/radio.interface'

@Component({
	host: {
		'[class]': 'align'
	},
	selector: 'mib-radio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioComponent),
			multi: true
		}
	],
	animations: [
		trigger('radioAnimation', [
			transition(':enter', [
				style({
					transform: 'translate(-50%,-90%) rotateX(-60deg)'
				}),
				animate(
					'300ms ease',
					style({
						transform: 'translate(-50%,-50%) rotateX(0deg)'
					})
				)
			]),
			transition(':leave', [
				style({
					transform: 'translate(-50%,-50%) rotateX(0deg)'
				}),
				animate(
					'200ms ease',
					style({
						transform: 'translate(-50%,-20%) rotateX(60deg)'
					})
				)
			])
		])
	]
})
export class RadioComponent implements ControlValueAccessor {
	public value: boolean = false

	@Input() size: MibRadioSize = 'm'
	@Input() class: string = ''
	@Input() align: string = 'flex_align-self-start'
	@Input() id: string = ''

	onChange: any = () => {}

	onTouch: any = () => {}

	writeValue(value: boolean): void {
		this.value = value
		this.onChange(this.value)
	}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn
	}

	setDisabledState?(isDisabled: boolean): void {
		console.log('radio disabled not implemented!')
	}

	onRadioChange(event: Event): void {
		event.stopPropagation()
		event.preventDefault()
		this.value = !this.value
		this.writeValue(this.value)
	}
}
