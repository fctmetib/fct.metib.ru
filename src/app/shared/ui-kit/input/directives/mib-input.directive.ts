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
import {InputBaseWrapperComponent} from '../components/input-base-wrapper/input-base-wrapper.component';
import {ToolsService} from '../../../services/tools.service';

@Directive({
  selector: '[mibInput]',
})
export class MibInputDirective extends BaseInputDirective implements AfterViewInit {

  @Input() custom: InputCustom = ''
  @Input() size: InputSize = 'm'
  @Input() styleType: InputType = 'filled-secondary'

  constructor(
    @Optional() public ngControl: NgControl,
    protected cdr: ChangeDetectorRef,
    protected au: AutoUnsubscribeService,
    protected r2: Renderer2,
    protected toolsService: ToolsService,
    public elementRef: ElementRef<HTMLInputElement>
  ) {
    super(ngControl, cdr, au, r2, toolsService, elementRef)
  }

  @HostBinding(`class`)
  get getClasses() {
    const classes = super.classes();
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
