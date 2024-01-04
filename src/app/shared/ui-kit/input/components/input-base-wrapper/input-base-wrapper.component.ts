import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Inject,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import {LeftIconDirective} from '../../../../directives/left-icon/left-icon.directive';
import {RightIconDirective} from '../../../../directives/right-icon/right-icon.directive';
import {startWith, takeUntil} from 'rxjs/operators';
import {merge, tap} from 'rxjs';
import {setPaddings} from '../../services/set-paddings.service';
import {AutoUnsubscribeService} from '../../../../services/auto-unsubscribe.service';
import {MibInputDirective} from '../../directives/mib-input.directive';
import {MibTextareaDirective} from '../../../textarea/directives/mib-textarea.directive';

@Component({
  selector: 'mib-input-base-wrapper',
  templateUrl: './input-base-wrapper.component.html',
  styleUrls: ['./input-base-wrapper.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class InputBaseWrapperComponent implements AfterViewInit {
  @ContentChild(MibInputDirective, {descendants: true}) inputDirective: MibInputDirective
  @ContentChild(MibTextareaDirective, {descendants: true}) textareaDirective: MibTextareaDirective

  @ViewChild('label') labelEl: ElementRef<HTMLSpanElement>
  @ViewChild('iconsLeftRef') iconsLeftEl: ElementRef<HTMLDivElement>
  @ViewChild('iconsRightRef') iconsRightEl: ElementRef<HTMLDivElement>
  @ViewChild('box') box: ElementRef<HTMLDivElement>
  @ViewChild('message') messageRef?: ElementRef
  @ContentChildren(LeftIconDirective) leftIcons: QueryList<LeftIconDirective>
  @ContentChildren(RightIconDirective) rightIcons: QueryList<RightIconDirective>

  public viewMounted: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private r2: Renderer2,
    private au: AutoUnsubscribeService
  ) {
  }

  get element(): HTMLInputElement | HTMLTextAreaElement {
    return this.directive?.elementRef?.nativeElement
  }

  get directive(): MibInputDirective | MibTextareaDirective {
    return this.inputDirective || this.textareaDirective
  }

  get isTextarea() {
    return this.element.tagName === 'TEXTAREA'
  }

  ngAfterViewInit(): void {
    this.leftIcons.changes.pipe(
      startWith(null),
      tap(() => this.setIconPaddings()),
      takeUntil(this.au.destroyer)
    ).subscribe();
    setTimeout(() => this.viewMounted = true)
    merge(this.leftIcons.changes, this.rightIcons.changes).pipe(
      startWith(null),
      tap(() => this.updateClasses()),
      takeUntil(this.au.destroyer)
    ).subscribe()
  }

  setIconPaddings() {
    setPaddings({
      leftEl: this.iconsLeftEl.nativeElement,
      rightEl: this.iconsRightEl.nativeElement,
      element: this.element,
    }, this.r2, this.platformId, ({newPaddingLeft}) => {
      this.r2.setStyle(this.labelEl.nativeElement, 'padding-left', newPaddingLeft)
    })
  }

  updateClasses() {
    this.directive?.addClasses(this.classes)
  }

  get classes() {
    const selector = this.isTextarea ? 'textarea' : 'input'
    return {
      [`${selector}_right-iconly}`]: Boolean(this.rightIcons.length),
      [`${selector}_left-iconly}`]: Boolean(this.leftIcons.length),
    }
  }

  focus() {
    this.inputDirective.elementRef.nativeElement.focus()
  }

}
