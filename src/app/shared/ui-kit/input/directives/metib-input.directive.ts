import {
	ChangeDetectorRef,
	Directive,
	ElementRef,
	HostBinding,
	HostListener,
	Input,
	Optional
} from '@angular/core'
import {
	InputCustom,
	InputSize,
	InputStatus,
	InputType
} from '../interfaces/input.interface'
import { AbstractControl, NgControl, Validators } from '@angular/forms'
import { Subscription, tap } from 'rxjs'

@Directive({
	selector: '[MibInput]'
})
export class MetibInputDirective {
	constructor(
		@Optional() private ngControl: NgControl,
		private cdr: ChangeDetectorRef,
		public elementRef: ElementRef<HTMLElement>
	) {}

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

	@HostBinding(`placeholder`)
	get getPlaceholder() {
		return this.control?.hasValidator(Validators.required)
			? this.placeholder + this.placeholderSuffix
			: this.placeholder
	}

	@HostBinding('custom')
	get getCustom() {
		return this.custom
	}

	@HostListener('blur', ['$event'])
	public onBlurEv() {
		this.touches += 1
		this.touched = true
		this.updateStatus()
	}

	get isTextarea() {
		return this.elementRef.nativeElement.tagName === 'TEXTAREA'
	}

	private subscriptions: Subscription[] = []

	public statusState: InputStatus = 'default'
	public control?: AbstractControl | null = null
	public dirty: boolean = false
	public touches: number = 0
	public touched: boolean = false
	public value: string = ''

	ngAfterViewInit() {
		this.control = this.ngControl?.control
		this.touches += this.control?.touched ? 1 : 0
		this.updateStatus()
		if (this.control) {
			this.subscriptions.push(
				this.control.valueChanges.subscribe(() => {
					this.dirty = this.control!.dirty
					this.touches++
					this.touched = true
				})
			)
			this.subscriptions.push(
				this.control.statusChanges
					.pipe(
						tap(status => {
							this.updateStatus()
						})
					)
					.subscribe()
			)
		}
		this.cdr.detectChanges()
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}

	public updateStatus(): void {
		if (this.disabled) {
			this.statusState = 'disabled'
		} else if (this.control?.invalid && this.touches > 0) {
			this.statusState = 'error'
		} else if (this.control?.valid && this.touches > 0) {
			this.statusState = 'active'
		} else if (this.control?.value?.length > 0) {
			this.statusState = 'filled'
		} else {
			this.statusState = 'default'
		}
		if (this.status) this.statusState = this.status
		this.cdr.detectChanges()
	}
}
