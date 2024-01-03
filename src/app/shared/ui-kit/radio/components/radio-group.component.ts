import {
	AfterContentInit,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	OnDestroy,
	OnInit,
	QueryList,
	forwardRef
} from '@angular/core'
import {RadioComponent} from '../radio.component'
import {BehaviorSubject, Subscription, tap} from 'rxjs'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

@Component({
	selector: 'mib-radio-group',
	templateUrl: './radio-group.component.html',
	styleUrls: ['./radio-group.component.scss']
	// providers: [
	// 	{
	// 		provide: NG_VALUE_ACCESSOR,
	// 		useExisting: forwardRef(() => RadioGroupComponent),
	// 		multi: true
	// 	}
	// ]
})
// implements ControlValueAccessor, OnInit, OnDestroy, AfterContentInit
export class RadioGroupComponent {
	@ContentChildren(RadioComponent)
	radioButton!: QueryList<RadioComponent>

	private subscriptions: Subscription[] = []

	public radioValue$ = new BehaviorSubject<boolean>(true)

	public value = true

	constructor(private cdr: ChangeDetectorRef) {}

	// ngOnInit(): void {
	// 	console.log('ON-INIT>>>')
	// }

	// get radioValue() {
	// 	return this.radioValue$.value
	// }

	// ngAfterContentInit(): void {
	// 	// console.log('AFTER-VIEW-INIT>>>')
	// 	// console.log('radioButtons :>> ', this.radioButton)
	// 	this.radioButton.changes.subscribe(() => {
	// 		// 	this.resetSubscriptions()
	// 		// 	this.subscribeToItems()
	// 	})
	// 	let btn = this.radioButton.get(0)
	// 	let value = this.radioButton.get(0)?.value
	// 	console.log('btn :>> ', btn)
	// 	if (btn) {
	// 		value = true
	// 		// this.setActiveRadio(value)
	// 		// 	console.log('btn.value :>> ', btn.value)
	// 	}
	// }

	// setActiveRadio(value: boolean) {
	// 	this.radioValue$.next(value)
	// 	this.cdr.detectChanges()
	// }

	// private resetSubscriptions() {
	// 	this.subscriptions.forEach(sub => sub.unsubscribe())
	// 	this.subscriptions = []
	// }

	// updateTabsAndButtons = () => {
	// 	this.radioButton.forEach(radio => {
	// 		console.log('radio :>> ', radio)
	// 		this.cdr.detectChanges()
	// 	})

	// 	this.cdr.detectChanges()
	// }

	// private subscribeToItems() {
	// 	this.updateTabsAndButtons()
	// }

	// ngOnDestroy(): void {
	// 	this.subscriptions.forEach(sub => sub.unsubscribe())
	// }

	// onChange: any = () => {}

	// onTouch: any = () => {}

	// writeValue(value: boolean): void {
	// 	this.value = value
	// }

	// registerOnChange(fn: any): void {
	// 	this.onChange = fn
	// }

	// registerOnTouched(fn: any): void {
	// 	this.onTouch = fn
	// }
}
