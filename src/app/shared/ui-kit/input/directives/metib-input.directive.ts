import { Directive, ElementRef, HostBinding, Input } from '@angular/core'
import {
	InputCustom,
	InputSize,
	InputStatus,
	InputType
} from '../interfaces/input.interface'

@Directive({
	selector: '[mibInputDirective]'
})
export class MetibInputDirective {
	constructor(public el: ElementRef<HTMLInputElement>) {}

	@Input() disabled: boolean = false
	@Input() controls: boolean = true
	@Input() custom: InputCustom = ''
	@Input() size: InputSize = 'l'
	@Input() status?: InputStatus
	@Input() class: string = ''
	@Input() placeholder: string = ''
	@Input() styleType: InputType = 'filled-secondary'
	@Input() placeholderSuffix: string = ' *'

	@HostBinding(`class`)
	get getClasses() {
		const classes: string[] = [
			'input',
			`input_${this.size}`,
			`input_type-${this.styleType}`,
			`input_${this.statusState}`,
			...this.class.split(' ')
		]
		return classes.join(' ')
	}

	public statusState: InputStatus = 'default'
}
