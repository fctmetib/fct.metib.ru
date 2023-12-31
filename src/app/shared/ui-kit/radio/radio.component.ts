import {animate, style, transition, trigger} from '@angular/animations'
import {Component, Input, ViewEncapsulation, forwardRef} from '@angular/core'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'
import {MibRadioSize} from './interfaces/radio.interface'

@Component({
	host: {
		'[class]': 'align'
	},
	selector: 'mib-radio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements ControlValueAccessor {
	public value: boolean = false

	@Input() size: MibRadioSize = 'm'
	@Input() class: string = ''
	@Input() align: string = 'flex_align-self-start'
	@Input() id: string = ''
	@Input() point: boolean

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
