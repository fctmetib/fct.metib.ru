import {
	AfterViewInit,
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
	NG_VALUE_ACCESSOR
} from '@angular/forms'
import {
	debounceTime,
	distinctUntilChanged,
	Observable,
	of,
	switchMap,
	tap
} from 'rxjs'
import {GetAgentRequestService} from 'src/app/public/service/get-agent-request.service'

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
export class TestAutocompleteComponent
	implements ControlValueAccessor, AfterViewInit
{
	@Input() isMulti: boolean = false
	@Output() onMultiplyChange = new EventEmitter<any>()
	@ViewChild('input', {static: false}) input: ElementRef

	control = new FormControl()
	options: any[] = []
	selectedOptions: any[] = []
	loading = false
	noData = false
	showDropdown = false
	onChange: any = () => {}
	onTouched: any = () => {}

	constructor(private getAgentRequestService: GetAgentRequestService) {}

	ngAfterViewInit() {
		this.control.valueChanges
			.pipe(
				debounceTime(300),
				distinctUntilChanged(),
				tap(() => (this.loading = true)),
				switchMap(value => this.fetchOptions(value))
			)
			.subscribe()
	}

	fetchOptions(query: string): Observable<any> {
		if (!query) {
			return of([])
		}
		return this.getAgentRequestService.getAgentData(query).pipe(
			tap(data => {
				this.options = data.suggestions || []
				this.noData = this.options.length === 0
				this.loading = false
				this.showDropdown = true
			})
		)
	}

	writeValue(value: any): void {
		this.selectedOptions = value || []
		this.control.setValue(this.getSelectedOptionsText(), {emitEvent: false})
	}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}

	toggleSelection(option: any) {
		const optionValue = option.value
		if (this.isMulti) {
			const index = this.selectedOptions.indexOf(optionValue)
			if (index >= 0) {
				this.selectedOptions.splice(index, 1)
			} else {
				this.selectedOptions.push(optionValue)
			}
		} else {
			this.selectedOptions = [optionValue]
		}
		this.onChange(this.selectedOptions)
		this.onMultiplyChange.emit(this.selectedOptions)
		this.control.setValue(this.getSelectedOptionsText(), {emitEvent: false})
		this.showDropdown = false
	}

	getSelectedOptionsText(): string {
		return this.selectedOptions.join(', ')
	}

	showOptions() {
		if (this.options.length === 0) {
			this.noData = true
		}
		this.showDropdown = true
	}

	hideOptions() {
		setTimeout(() => {
			this.showDropdown = false
		}, 200)
	}
}
