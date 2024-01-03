import {animate, style, transition, trigger} from '@angular/animations'
import {
	AfterContentInit,
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
	Self,
	ViewEncapsulation,
	forwardRef
} from '@angular/core'
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgControl
} from '@angular/forms'
import {MibRadioSize} from './interfaces/radio.interface'

@Component({
	host: {
		'[class]': 'align'
	},
	selector: 'mib-radio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements ControlValueAccessor, OnInit {
	@Input() size: MibRadioSize = 'm'
	@Input() class: string = ''
	@Input() align: string = 'flex_align-self-start'

	@Input() value: any
	check: any
	onChange = (value: any) => {}
	onTouched = () => {}
	constructor(@Self() private ngControl: NgControl) {
		ngControl.valueAccessor = this
	}

	ngOnInit() {
		this.ngControl.control.valueChanges.subscribe(value => {
			if (this.check === value) return
			this.writeValue(value)
		})
	}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}

	writeValue(value: any) {
		this.check = value
	}

	onRadioChange() {
		this.check = this.check === this.value ? null : this.value
		this.onChange(this.check)
	}
}
