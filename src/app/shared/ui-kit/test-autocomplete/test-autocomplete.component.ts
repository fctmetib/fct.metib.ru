import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

@Component({
	selector: 'mib-test-autocomplete',
	templateUrl: './test-autocomplete.component.html',
	styleUrls: ['./test-autocomplete.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TestAutocompleteComponent),
			multi: true
		}
	]
})
export class TestAutocompleteComponent implements ControlValueAccessor {
	@Input() isMulti: boolean = false
	@Input() options: any[] = []
	@Output() onMultiplyChange = new EventEmitter<any>()

	selectedOptions: any[] = []
	onChange: any = () => {}
	onTouched: any = () => {}

	writeValue(value: any): void {
		this.selectedOptions = value || []
	}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}

	toggleSelection(option: any) {
		if (this.isMulti) {
			const index = this.selectedOptions.indexOf(option)
			if (index >= 0) {
				this.selectedOptions.splice(index, 1)
			} else {
				this.selectedOptions.push(option)
			}
		} else {
			this.selectedOptions = [option]
		}
		this.onChange(this.selectedOptions)
		this.onMultiplyChange.emit(this.selectedOptions)
	}

	getSelectedOptionsText(): string {
		return this.selectedOptions.map(option => option).join(', ')
	}
}
