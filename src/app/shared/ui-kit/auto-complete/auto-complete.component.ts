import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ContentChildren,
	ElementRef,
	forwardRef,
	Injector,
	Input,
	Optional,
	QueryList,
	Renderer2,
	ViewChild
} from '@angular/core'
import {MibInputDirective} from '../input/directives/mib-input.directive'
import {DropdownPointComponent} from '../dropdown-point/dropdown-point.component'
import {DropdownService} from '../dropdown/services/dropdown.service'
import {BehaviorSubject, first, fromEvent, map, switchMap, tap} from 'rxjs'
import {DropdownComponent} from '../dropdown/dropdown.component'
import {DropdownDirective} from '../dropdown/directives/dropdown.directive'
import {
	AbstractControl,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgControl
} from '@angular/forms'
import {startWith, takeUntil} from 'rxjs/operators'
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service'

/**
 * Компонент `mib-auto-complete` - это автозаполняемое поле ввода,
 * поддерживающее как одиночный, так и множественный выбор из предложенных опций.
 * Он использует `DropdownPointComponent` для отображения опций выбора.
 *
 * Как использовать:
 *
 * 1. Добавьте `<mib-auto-complete>` в ваш шаблон Angular.
 * 2. Воспользуйтесь директивой `MibInputDirective` в вашем вводе, чтобы связать его с автозаполнением.
 * 3. Используйте `DropdownPointComponent` для задания опций выбора.
 * 4. Управляйте поведением автозаполнения с помощью свойства `multi`. Если `multi` установлено в `true`,
 *    компонент будет поддерживать множественный выбор. В противном случае - только одиночный выбор.
 *
 * Пример использования:
 * <mib-auto-complete [multi]="true">
 *   <input mibInput />
 *   <mib-dropdown-point *ngFor="let option of options" [value]="option.value">{{ option.label }}</mib-dropdown-point>
 * </mib-auto-complete>
 *
 * Важно:
 * - `mibInput` директива должна быть применена к элементу `<input>` внутри компонента `mib-auto-complete`.
 * - Каждый `mib-dropdown-point` должен иметь уникальное значение `value`, которое будет использоваться для отслеживания выбранных опций.
 *
 */
@Component({
	selector: 'mib-auto-complete',
	templateUrl: './auto-complete.component.html',
	styleUrls: ['./auto-complete.component.scss'],
	providers: [
		AutoUnsubscribeService,
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AutoCompleteComponent),
			multi: true
		}
	]
})
export class AutoCompleteComponent
	implements AfterContentInit, AfterViewInit, ControlValueAccessor
{
	@ViewChild('menu') menu: DropdownComponent
	@ViewChild(DropdownDirective, {read: ElementRef}) dropdownElement: ElementRef
	@ContentChild(MibInputDirective) inputDirective!: MibInputDirective
	@ContentChildren(forwardRef(() => DropdownPointComponent))
	options: QueryList<DropdownPointComponent>
	// TODO: СДЕЛАТЬ ПАРАМЕТР MULTI
	// @Input() multi: boolean = false;

	multi = false

	private control?: AbstractControl
	public filteredOptions: DropdownPointComponent[] = []
	public selectedOption: DropdownPointComponent | null = null
	public selectedOptions: DropdownPointComponent[] = []
	private innerValue$ = new BehaviorSubject<any>(null)

	constructor(
		private injector: Injector,
		private au: AutoUnsubscribeService,
		private cdr: ChangeDetectorRef,
		private dropdownService: DropdownService
	) {}

	private _filter(value: string): DropdownPointComponent[] {
		let filterValue = value.toLowerCase()
		return this.options.filter(option =>
			option.text.toLowerCase().includes(filterValue)
		)
	}

	getVisibleState(value: any) {
		if (!this.options.length) {
			return true
		} else {
			return this.filteredOptions.some(option => option.value === value)
		}
	}
	private onChange: (value: any) => void = () => {}

	private onTouched: () => void = () => {}

	writeValue(value: any): void {
		this.innerValue$.next(value)
	}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}

	ngAfterContentInit() {}

	ngAfterViewInit() {
		this.options.changes
			.pipe(
				tap(() => {
					this.filteredOptions = this._filter(
						this.inputDirective.elementRef.nativeElement.value
					)
				}),
				switchMap(() => {
					this.control = this.injector.get(NgControl, null).control
					if (this.control) {
						return this.control.valueChanges.pipe(
							tap(value => {
								this.inputDirective.updateStatus(this.control, true)
								this.updateSelectedOption(value)
							})
						)
					}
				}),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
		if (this.inputDirective && this.inputDirective.elementRef) {
			fromEvent(this.inputDirective.elementRef.nativeElement, 'input')
				.pipe(
					map((event: Event) => (event.target as HTMLInputElement).value),
					startWith(''),
					tap(value => {
						if (this.multi) {
						} else {
							if (!value) {
								this.onChange(null)
							}
						}
					}),
					map(value => this._filter(value)),
					takeUntil(this.au.destroyer)
				)
				.subscribe(filtered => {
					this.filteredOptions = filtered
				})
			fromEvent(this.inputDirective.elementRef.nativeElement, 'blur')
				.pipe(
					tap(value => {
						this.inputDirective.updateStatus(this.control)
						this.inputDirective.elementRef.nativeElement.value = ''
					}),
					takeUntil(this.au.destroyer)
				)
				.subscribe()
		}
	}

	matchOption(value: any): boolean {
		if (this.multi) {
			// Для мульти-выбора проверяем, содержится ли значение в массиве selectedOptions
			return this.selectedOptions.some(option => option.value === value)
		} else {
			// Для одиночного выбора проверяем, совпадает ли значение с selectedOption
			return this.selectedOption && this.selectedOption.value === value
		}
	}

	private updateSelectedOption(value: any): void {
		if (this.multi) {
			this.selectedOptions = this.options.filter(option => {
				const boolean = Array.isArray(value) && value.includes(option.value)
				option.control.setValue(boolean)
				return boolean
			})
		} else {
			this.selectedOption =
				this.options.find(option => option.value === value) || null
			if (this.inputDirective) {
				this.inputDirective.elementRef.nativeElement.value =
					this.selectedOption?.text ?? ''
				this.cdr.detectChanges()
			}
		}
		this.filteredOptions = this._filter(this.selectedOption?.text ?? '')
	}

	selectOption(option: DropdownPointComponent): void {
		if (this.multi) {
			const index = this.selectedOptions.findIndex(
				opt => opt.value === option.value
			)

			if (index === -1 && option.control.value) {
				// Если опция не выбрана и чекбокс активен, добавляем её в массив
				this.selectedOptions.push(option)
			} else if (index > -1 && !option.control.value) {
				// Если опция уже выбрана и чекбокс неактивен, удаляем её из массива
				this.selectedOptions.splice(index, 1)
			}

			this.innerValue$.next(this.selectedOptions.map(opt => opt.value))
			this.onChange(this.innerValue$.value)
		} else {
			this.selectedOption = option
			this.innerValue$.next(option.value)
			this.onChange(this.innerValue$.value)
			this.close()
		}
		if (this.inputDirective) {
			this.inputDirective.elementRef.nativeElement.value = option.text
			this.cdr.detectChanges()
		}
		this.onTouched()
	}

	close(): void {
		this.dropdownService.closeMenu()
	}
}
