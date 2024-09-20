import { isPlatformBrowser } from "@angular/common";
import { Directive, ElementRef, HostListener, Inject, Input, PLATFORM_ID } from "@angular/core";

@Directive({
  selector: "[mib-scroll]",
  exportAs: "mib-scroll"
})
export class MibScrollDirective {
  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @Input() scrollUnit: number;

  private get element() {
    if (isPlatformBrowser(this.platformId)) {
      return this.elementRef.nativeElement;
    }
    return null;
  }

  get isOverflow() {
    return this.element ? this.element.scrollWidth > this.element.clientWidth : false;
  }

  scroll(direction: number) {
    if (this.element) {
      this.element.scrollLeft += this.scrollUnit * direction;
    }
  }

  get canScrollStart() {
    return this.element ? this.element.scrollLeft > 0 : false;
  }

  get canScrollEnd() {
    return this.element
      ? this.element.scrollLeft + this.element.clientWidth !== this.element.scrollWidth
      : false;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
    }
  }
}
