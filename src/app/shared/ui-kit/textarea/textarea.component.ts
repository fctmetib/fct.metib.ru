import {AfterViewInit, ChangeDetectorRef, Component, ContentChild, Input} from '@angular/core';
import {MibTextareaDirective} from './directives/mib-textarea.directive';
import {fromEvent, tap} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service';

@Component({
  selector: 'mib-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class TextareaComponent implements AfterViewInit {
  @ContentChild(MibTextareaDirective, {descendants: true}) textareaDirective: MibTextareaDirective

  @Input() controls: boolean = true

  isResizing: boolean = false
  startPosX: number = 0
  startPosY: number = 0

  public maxLength: number = 0
  public textLength: number = 0

  constructor(
    private cdr: ChangeDetectorRef,
    private au: AutoUnsubscribeService
  ) {
  }

  get textareaElement(): HTMLTextAreaElement {
    return this.textareaDirective?.elementRef?.nativeElement
  }

  ngAfterViewInit() {
    if (this.textareaDirective) {
      const {maxLength, textLength} = this.textareaElement
      this.maxLength = maxLength
      this.textLength = textLength
      fromEvent(this.textareaElement, 'input').pipe(
        tap(event => {
          const target = event.target as HTMLTextAreaElement
          this.maxLength = target.maxLength
          this.textLength = target.textLength
          this.cdr.detectChanges()
        }),
        takeUntil(this.au.destroyer)
      ).subscribe()
    } else {
      throw new Error('mib-textarea should contains <input mibTextarea/>!')
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
