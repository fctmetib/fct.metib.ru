import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Inject, Optional, Renderer2} from '@angular/core';
import {BaseInputDirective} from '../../input/directives/base-input.directive';
import {NgControl} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {AutoUnsubscribeService} from '../../../services/auto-unsubscribe.service';

@Directive({
  selector: '[mibTextarea]'
})
export class MibTextareaDirective extends BaseInputDirective implements AfterViewInit {

  constructor(
    @Optional() public ngControl: NgControl,
    @Inject(DOCUMENT) private doc: Document,
    protected cdr: ChangeDetectorRef,
    protected au: AutoUnsubscribeService,
    protected r2: Renderer2,
    public elementRef: ElementRef<HTMLTextAreaElement>
  ) {
    super(ngControl, cdr, au, r2, elementRef)
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
