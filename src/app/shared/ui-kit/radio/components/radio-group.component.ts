import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  forwardRef
} from '@angular/core'
import {RadioComponent} from '../radio.component'
import {BehaviorSubject, tap} from 'rxjs'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

@Component({
  selector: 'mib-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    },
  ]
})

export class RadioGroupComponent implements ControlValueAccessor, OnInit, AfterContentInit {
  @ContentChildren(forwardRef(() => RadioComponent)) buttons: QueryList<RadioComponent>

  public value$ = new BehaviorSubject<boolean>(true)

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  	this.value$.next(this.buttons.get(0)?.value)
  }

  setActiveRadio(radio: RadioComponent) {
  	this.value$.next(radio.value)
  }

  match(value: any) {
    return this.value$.value === value
  }

  onChange: any = () => {}

  onTouch: any = () => {}

  writeValue(value: boolean): void {
  	this.value$.next(value)
  }

  registerOnChange(fn: any): void {
  	this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  	this.onTouch = fn
  }
}
