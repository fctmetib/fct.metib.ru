import { Component, Input } from '@angular/core'
import { MibSwitchSize } from './interfaces/switch.interface'

@Component({
	host: {
		'[class]': 'align'
	},
	selector: 'mib-switch',
	templateUrl: './switch.component.html',
	styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
	@Input() size: MibSwitchSize = 'm'
	@Input() class: string = ''
	@Input() align: string = 'flex_align-self-start'
	@Input() id: string = ''

	public value: boolean = false

	ngAfterViewInit() {}

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

	onSwitchChange(event: Event): void {
		event.stopPropagation()
		event.preventDefault()
		this.value = !this.value
		this.writeValue(this.value)
	}
}
