import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'mib-swipe-text-slider',
  templateUrl: './swipe-text-slider.component.html',
  styleUrls: ['./swipe-text-slider.component.scss']
})
export class SwipeTextSliderComponent implements AfterViewInit {
  public sliderTextData: { title: string; description: string }[] = [
    { title: 'Менее 15 минут', description: 'на решение по сделке' },
    { title: 'От 0,05% в день', description: 'ставка за финансирование' },
    { title: 'Более 180 дней', description: 'отсрочка платежа' }
  ];

  public currentIdx: number = 0;

  @ViewChild('textSlider') textSlider!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public prev() {
    if (this.currentIdx > 0) {
      this.currentIdx--;
    }
  }

  public next() {
    if (this.currentIdx < this.sliderTextData.length - 1) {
      this.currentIdx++;
    }
  }

  ngAfterViewInit(): void {
    // Проверяем, что код выполняется в браузере
    if (isPlatformBrowser(this.platformId)) {
      import('hammerjs').then((Hammer) => {
        const hammer = new Hammer(this.textSlider.nativeElement);
        hammer.on('swipeleft', () => this.prev());
        hammer.on('swiperight', () => this.next());
      });
    }
  }

  getProgressWidth(): string {
    return ((this.currentIdx + 1) / this.sliderTextData.length) * 100 + '%';
  }
}
