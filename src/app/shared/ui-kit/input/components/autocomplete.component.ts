import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validator
} from '@angular/forms'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import { InputType } from '../interfaces/input.interface';

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
export class AutocompleteComponent
  implements OnInit, ControlValueAccessor, Validator, OnDestroy {
  @Input() options: any[] = []
  @Input() loading: boolean = false
  @Input() extra: boolean = false
  @Input() innType: boolean = false
  @Input() searchIcon: boolean = false
  @Input() inlineStyle: boolean = false
  @Input() styleType: InputType = 'floating'
  @Input() label: string
  @Output() valueChanged = new EventEmitter<string>()
  @Output() focus = new EventEmitter<any>()
  @Output() confirm = new EventEmitter<any>()
  control = new FormControl()
  showDropdown = false
  noData = false

  public isDesktop: boolean = false

  private subscriptions = new Subscription()

  @ViewChild('input') inputDefault: ElementRef
  @ViewChild('inputExtra') inputExtra: ElementRef

  constructor(private breakpointService: BreakpointObserverService) {
  }

  get input() {
    if (this.extra) {
      return this.inputExtra
    }
    return this.inputDefault
  }

  ngOnInit(): void {
    this.subscriptions = this.breakpointService
      .isDesktop()
      .subscribe(b => (this.isDesktop = b))
  }

  writeValue(value: any): void {
    this.showOptions()
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
    this.control.setValue(this.innType ? option?.data?.inn : option.value, {emitEvent: true})
    this.showDropdown = false
    this.confirm.emit()
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
