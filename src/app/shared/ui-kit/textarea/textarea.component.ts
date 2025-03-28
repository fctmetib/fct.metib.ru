import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild, ContentChildren,
  forwardRef,
  HostBinding,
  Input, QueryList,
  Renderer2,
  ViewChild
} from '@angular/core'
import {MibTextareaDirective} from './directives/mib-textarea.directive'
import {fromEvent, tap} from 'rxjs'
import {takeUntil} from 'rxjs/operators'
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service'
import {InputCustom, InputSize, InputType} from '../input/interfaces/input.interface'
import {InputBaseWrapperComponent} from '../input/components/input-base-wrapper/input-base-wrapper.component'
import {ToolsService} from '../../services/tools.service'
import {LeftIconDirective} from '../../directives/left-icon/left-icon.directive'
import {RightIconDirective} from '../../directives/right-icon/right-icon.directive'
import {LabelDirective} from '../../directives/label.directive'

@Component({
  selector: 'mib-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class TextareaComponent implements AfterViewInit {
  @ContentChild(MibTextareaDirective, {descendants: true}) textareaDirective: MibTextareaDirective

  @ContentChild(LabelDirective, {descendants: true}) labelDirective: LabelDirective

  @ContentChildren(LeftIconDirective, {descendants: true}) leftIcons: QueryList<LeftIconDirective>
  @ContentChildren(RightIconDirective, {descendants: true}) rightIcons: QueryList<RightIconDirective>

  @ViewChild(forwardRef(() => InputBaseWrapperComponent)) base: InputBaseWrapperComponent

  @Input() controls: boolean = true
  @Input() custom: InputCustom = ''
  @Input() size: InputSize = 'm'
  @Input() styleType: InputType = 'filled-secondary'

  isResizing: boolean = false
  startPosX: number = 0
  startPosY: number = 0

  public maxLength: number = 0
  public textLength: number = 0

  constructor(
    private cdr: ChangeDetectorRef,
    private au: AutoUnsubscribeService,
    private r2: Renderer2,
    private toolsService: ToolsService
  ) {
  }

  get classes() {
    const classes = this.textareaDirective.classes()
    return {
      ...classes,
      [`input_${this.size}`]: true,
      [`input_type-${this.styleType}`]: true
    }
  }

  get textareaElement(): HTMLTextAreaElement {
    return this.textareaDirective?.elementRef?.nativeElement
  }

  ngAfterViewInit() {
    if (this.textareaDirective) {
      const { maxLength } = this.textareaElement;
      this.maxLength = maxLength;
      this.textLength = (this.textareaElement.value || '').length;

      fromEvent(this.textareaElement, 'input')
        .pipe(
          tap(event => {
            const target = event.target as HTMLTextAreaElement;
            this.maxLength = target.maxLength;
            this.textLength = target.textLength;
            this.cdr.detectChanges();
          }),
          takeUntil(this.au.destroyer)
        )
        .subscribe();

      if (this.textareaDirective.ngControl) {
        this.textareaDirective.ngControl.valueChanges
          .pipe(
            tap(value => {
              this.textLength = (value || '').length;
              this.cdr.detectChanges();
            }),
            takeUntil(this.au.destroyer)
          )
          .subscribe();
      }

      this.toolsService.parseClassesObject(this.classes, className => {
        this.r2.addClass(this.base.box.nativeElement, className);
      });
    } else {
      throw new Error('mib-textarea should contain <textarea mibTextarea></textarea>!');
    }
  }


  startResize(event: MouseEvent) {
    event.preventDefault()
    this.isResizing = true
    this.startPosX = event.clientX
    this.startPosY = event.clientY
  }

  stopResize($event: MouseEvent) {
    this.isResizing = false
  }

  onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      const deltaX = event.clientX - this.startPosX
      const deltaY = event.clientY - this.startPosY
      if (this.textareaElement) {
        this.textareaElement.style.width = this.textareaElement.offsetWidth + deltaX + 'px'
        this.textareaElement.style.height = this.textareaElement.offsetHeight + deltaY + 'px'
      }
      this.startPosX = event.clientX
      this.startPosY = event.clientY
    }
  }
}
