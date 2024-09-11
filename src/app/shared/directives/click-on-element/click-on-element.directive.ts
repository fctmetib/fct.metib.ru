import {Directive, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[mibClickOnElement]'
})
export class ClickOnElementDirective {
  @Output() clickOnElement = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  public handleClick(event: MouseEvent): void {
    if (event.target === this.elementRef.nativeElement) {
      this.clickOnElement.emit();
    }
  }

}

