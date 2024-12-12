import { Component, Input, ViewEncapsulation, forwardRef, inject, ChangeDetectorRef } from '@angular/core';
import {MibCheckboxSize} from './interfaces/checkbox.interface'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'
import {animate, style, transition, trigger} from '@angular/animations'

@Component({
	host: {
		'[class]': 'align'
	},
	selector: 'mib-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxComponent),
			multi: true
		},
	],
	animations: [
		trigger('checkboxAnimation', [
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
export class CheckboxComponent implements ControlValueAccessor {
	@Input() size: MibCheckboxSize = 'm'
	@Input() class: string = ''
	@Input() align: string = 'flex_align-self-start'
	@Input() id: string = ''
	@Input() styled: boolean = false

	public value: boolean = false
  private cdr = inject(ChangeDetectorRef)

	ngAfterViewInit() {}

	onChange: any = () => {}
	onTouch: any = () => {}

	writeValue(value: boolean): void {
		this.value = value
		this.onChange(this.value)
    this.cdr.detectChanges()
	}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn
	}

	onCheckboxChange(event: Event): void {
		event.preventDefault()
		event.stopPropagation()
		this.value = !this.value
		this.writeValue(this.value)
	}
}
