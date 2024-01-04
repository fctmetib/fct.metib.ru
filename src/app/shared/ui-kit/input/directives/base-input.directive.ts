import {ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Input, Optional, Renderer2} from '@angular/core';
import {AbstractControl, NgControl, Validators} from '@angular/forms';
import {AutoUnsubscribeService} from '../../../services/auto-unsubscribe.service';
import {InputStatus} from '../interfaces/input.interface';
import {tap} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[mibBaseInput]',
  providers: [AutoUnsubscribeService]
})
export class BaseInputDirective {

  @Input() placeholderSuffix: string = ' *'
  @Input() placeholder: string = ''
  @Input() disabled: boolean = false

  public status?: InputStatus = 'default'
  public touchesCount: number = 0
  public touched: boolean = false
  public value: string = ''

  constructor(
    @Optional() public ngControl: NgControl,
    protected cdr: ChangeDetectorRef,
    protected au: AutoUnsubscribeService,
    protected r2: Renderer2,
    public elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
  ) {
  }

  get control() {
    return this.ngControl?.control
  }

  get isDirty() {
    return this.control?.dirty
  }

  addClasses(classesObj: { [key: string]: boolean }): void {
    Object.keys(classesObj).forEach(className => {
      if (classesObj[className]) {
        this.r2.addClass(this.elementRef.nativeElement, className);
      }
    });
  }

  generateClasses(selector: string = 'input') {
    return {
      [selector]: true,
      [`${selector}_${this.status}`]: true,
    }
  }

  @HostBinding(`placeholder`)
  get getPlaceholder() {
    return this.control?.hasValidator(Validators.required)
      ? this.placeholder + this.placeholderSuffix
      : this.placeholder
  }

  @HostListener('blur', ['$event'])
  public onBlurEv() {
    this.touchesCount += 1
    this.touched = true
    this.updateStatus()
  }

  ngAfterViewInit() {
    this.touchesCount += this.control?.touched ? 1 : 0
    this.updateStatus()
    if (this.control) {
      this.control.statusChanges.pipe(
        tap(this.updateStatus),
        takeUntil(this.au.destroyer)
      ).subscribe()
    }
  }

  public updateStatus(): void {
    if (this.disabled) {
      this.status = 'disabled'
    } else if (this.control?.invalid && this.touchesCount > 0) {
      this.status = 'error'
    } else if (this.control?.valid && this.touchesCount > 0) {
      this.status = 'active'
    } else if (this.control?.value?.length > 0) {
      this.status = 'filled'
    } else {
      this.status = 'default'
    }
    this.cdr.detectChanges()
  }

}
