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
  @Input() label: string
  @Output() valueChanged = new EventEmitter<string>()
  control = new FormControl()
  showDropdown = false
  noData = false

  public isDesktop: boolean = false

  private subscriptions = new Subscription()

  @ViewChild('input', {static: true}) input: ElementRef

  constructor(private breakpointService: BreakpointObserverService) {
  }

  ngOnInit(): void {
    this.subscriptions = this.breakpointService
      .isDesktop()
      .subscribe(b => (this.isDesktop = b))
  }

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
