import {Directive, ElementRef, EventEmitter, Inject, Output, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Directive({
  selector: '[mibElementInView]'
})
export class ElementInViewDirective {
  @Output() onEntry: EventEmitter<boolean> = new EventEmitter();

  private observer!: IntersectionObserver;

  constructor(
    private element: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngAfterViewInit() {
    const config = {
      rootMargin: '0px',
      threshold: [0]
    };

    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(([entry]) => this.onEntry.emit(entry.isIntersecting), config);
      this.observer.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

}
