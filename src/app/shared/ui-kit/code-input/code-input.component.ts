import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {InputEmitInterface} from './directives/input-event/interfaces/input-emit.interface';

@Component({
  selector: 'mib-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeInputComponent),
      multi: true
    }
  ]
})
export class CodeInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
  }

  @Input() disabled: boolean = false;
  @Input() symbolsCount: number = 6;
  @ViewChildren('inputRefs') inputRefs!: QueryList<ElementRef<HTMLInputElement>>;

  public form!: FormGroup;
  public inputs: number[] = []
  public viewMounted: boolean = false;
  public delay: number = 0;
  public SECONDS: number = 60;
  public code: number = 0;

  ngOnInit() {
    this.initForms();
  }

  ngAfterViewInit() {
    this.inputs = Array.from(Array(this.symbolsCount).keys());
    this.inputs.forEach(i => this.form.addControl(i.toString(), this.fb.control(null, [Validators.required, Validators.maxLength(1)])))
    this.viewMounted = true;
    this.inputRefs.get(0)?.nativeElement.focus();
    this.cdr.detectChanges();
  }

  public onInput(event: InputEmitInterface) {
    let input: ElementRef<HTMLInputElement> | undefined;
    if (event.action === 'next') {
      input = this.inputRefs.find((input) => +input.nativeElement.id === event.id + 1);
    } else if (event.action === 'back') {
      input = this.inputRefs.find((input) => +input.nativeElement.id === event.id - 1);
    }

    this.onChange(Object.values(this.form.getRawValue()).join(''));
    this.onTouch();
    if (input) input.nativeElement.focus();
  }

  private initForms(): void {
    this.form = this.fb.group({});
  }

  public onChange: any = () => {
  };
  public onTouch: any = () => {
  };

  writeValue(value: any): void {
    this.code = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
