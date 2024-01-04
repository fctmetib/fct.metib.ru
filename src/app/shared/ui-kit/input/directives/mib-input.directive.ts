import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener, Inject,
  Input,
  Optional, Renderer2
} from '@angular/core'
import {
  InputCustom,
  InputSize,
  InputStatus,
  InputType
} from '../interfaces/input.interface'
import {AbstractControl, NgControl, Validators} from '@angular/forms'
import {Subscription, tap} from 'rxjs'
import {DOCUMENT} from '@angular/common';
import {AutoUnsubscribeService} from '../../../services/auto-unsubscribe.service';
import {takeUntil} from 'rxjs/operators';
import {BaseInputDirective} from './base-input.directive';

@Directive({
  selector: '[mibInput]',
})
export class MibInputDirective extends BaseInputDirective implements AfterViewInit {
  constructor(
    @Optional() public ngControl: NgControl,
    protected cdr: ChangeDetectorRef,
    protected au: AutoUnsubscribeService,
    protected r2: Renderer2,
    public elementRef: ElementRef<HTMLInputElement>,
  ) {
    super(ngControl, cdr, au, r2, elementRef)
  }

  @Input() custom: InputCustom = ''
  @Input() size: InputSize = 'm'
  @Input() styleType: InputType = 'filled-secondary'

  @HostBinding(`class`)
  get getClasses() {
    const classes = super.generateClasses();
    return {
      ...classes,
      [`input_${this.size}`]: true,
      [`input_type-${this.styleType}`]: true,
    }
  }

  @HostBinding('custom')
  get getCustom() {
    return this.custom
  }

  ngAfterViewInit() {
    super.ngAfterViewInit()
  }
}
