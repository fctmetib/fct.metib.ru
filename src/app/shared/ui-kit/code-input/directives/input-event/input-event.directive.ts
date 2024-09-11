import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {InputEmitInterface} from "./interfaces/input-emit.interface";
import {AbstractControl, ControlContainer} from "@angular/forms";

@Directive({
  selector: '[inputEvent]'
})
export class InputEventDirective implements AfterViewInit {

  constructor(
    private container: ControlContainer,
    private el: ElementRef,
  ) {
    this.input = el;
  }

  ngAfterViewInit() {
    if (this.formControlName) this.control = this.container.control?.get(this.formControlName)
  }


  @HostListener('keydown', ['$event'])
  onKeydownEvent(event: KeyboardEvent) {
    const input: HTMLInputElement = this.input.nativeElement;
    this.acceptable = true;
    this.code = event.code
    if (event.key === 'Delete') {
      this.output.action = null
      this.control?.setValue(null)
      this.output.id = +input.id
      this.onInput.emit(this.output)
    } else if (event.key === 'Backspace') {
      this.output.action = 'back'
      this.control?.setValue(null)
      this.output.id = +input.id
      this.onInput.emit(this.output)
      event.preventDefault();
    } else if (event.code.startsWith('Digit')) {
      this.output.action = 'next'
    } else {
      this.acceptable = false;

      if (event.key === 'ArrowLeft' || event.shiftKey && event.key === 'Tab') {
        event.preventDefault()
        this.output.action = 'back'
      } else if (event.key === 'ArrowRight' || event.key === 'Tab') {
        event.preventDefault()
        this.output.action = 'next'
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()
      }
      this.output.id = +input.id
      this.onInput.emit(this.output)
    }
  }
  @HostListener('input', ['$event'])
  onInputEvent(event: any) {
    const input = event.target;
    if (this.acceptable) {
      // Изменено условие для включения 0
      if (event.data >= '0' && event.data <= '9') {
        this.control?.setValue(event.data);
      } else {
        this.control?.setValue(null);
      }
    } else {
      this.control?.setValue(null);
    }
    this.output.id = +input.id;
    this.onInput.emit(this.output);
  }

  @Input() formControlName?: string;
  @Output() onInput: EventEmitter<InputEmitInterface> = new EventEmitter<InputEmitInterface>()

  public output: InputEmitInterface = {} as InputEmitInterface;
  public acceptable: boolean = true;
  public code: string = '';
  public input!: ElementRef;
  public control?: AbstractControl | null
}
