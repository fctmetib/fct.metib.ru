import {
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	Output,
	ViewChild
} from '@angular/core'
import {
	ControlValueAccessor,
	FormControl,
	NG_VALUE_ACCESSOR,
	Validator
} from '@angular/forms'

@Component({
	selector: 'mib-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AutocompleteComponent),
			multi: true
		}
	]
})
export class AutocompleteComponent implements ControlValueAccessor, Validator {
	@Input() options: any[] = []
	@Input() loading: boolean = false
	@Output() valueChanged = new EventEmitter<string>()
	control = new FormControl()
	showDropdown = false
	noData = false

	@ViewChild('input', {static: true}) input: ElementRef

	writeValue(value: any): void {
		this.control.setValue(value, {emitEvent: false})
	}

	registerOnChange(fn: any): void {
		this.control.valueChanges.subscribe(value => {
			fn(value)
			this.valueChanged.emit(value)
		})
	}

	registerOnTouched(fn: any): void {
		// Not used
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.control.disable() : this.control.enable()
	}

	toggleSelection(option: any) {
		this.control.setValue(option.value, {emitEvent: true})
		this.showDropdown = false
	}

	onBlur() {
		setTimeout(() => {
			this.showDropdown = false
		}, 200)
	}

	validate() {
		return this.control.valid ? null : {invalid: true}
	}

	showOptions() {
		this.showDropdown = true
	}

	hideOptions() {
		setTimeout(() => {
			this.showDropdown = false
		}, 200)
	}

	clearInput() {
		this.showDropdown = false
		this.control.setValue('')
		this.input.nativeElement.focus()
	}
}
