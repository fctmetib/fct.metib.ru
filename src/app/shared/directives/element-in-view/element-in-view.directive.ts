import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[mibElementInView]'
})
export class ElementInViewDirective {
  @Output() onEntry: EventEmitter<boolean> = new EventEmitter();

  private observer!: IntersectionObserver;

  constructor(
    private element: ElementRef
  ) {
  }

  ngAfterViewInit() {
    const config = {
      rootMargin: '0px',
      threshold: [0]
    };

    this.observer = new IntersectionObserver(([entry]) => this.onEntry.emit(entry.isIntersecting), config);
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

}
