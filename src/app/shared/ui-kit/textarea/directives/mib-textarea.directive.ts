import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostListener, Inject, Optional, Renderer2} from '@angular/core';
import {BaseInputDirective} from '../../input/directives/base-input.directive';
import {NgControl} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {AutoUnsubscribeService} from '../../../services/auto-unsubscribe.service';
import {InputBaseWrapperComponent} from '../../input/components/input-base-wrapper/input-base-wrapper.component';
import {ClassesObject, ToolsService} from '../../../services/tools.service';
import {TextareaComponent} from '../textarea.component';

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
    protected toolsService: ToolsService,
    public elementRef: ElementRef<HTMLTextAreaElement>
  ) {
    super(ngControl, cdr, au, r2, toolsService, elementRef)
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.addClasses(this.classes())
  }
}
