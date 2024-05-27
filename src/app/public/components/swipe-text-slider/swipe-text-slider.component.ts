import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'
import * as Hammer from 'hammerjs'

@Component({
	selector: 'mib-swipe-text-slider',
	templateUrl: './swipe-text-slider.component.html',
	styleUrls: ['./swipe-text-slider.component.scss']
})
export class SwipeTextSliderComponent implements AfterViewInit {
	public sliderTextData: {title: string; description: string}[] = [
		{title: 'Менее 15 минут', description: 'на решение по сделке'},
		{title: 'От 12% в месяц', description: 'ставка по задолженности'},
		{title: 'До 210 дней', description: 'отсрочка платежа'}
	]

	public currentIdx: number = 0

	@ViewChild('textSlider') textSlider!: ElementRef

	public prev() {
		if (this.currentIdx > 0) {
			this.currentIdx--
		}
	}

	public next() {
		if (this.currentIdx < this.sliderTextData.length - 1) {
			this.currentIdx++
		}
	}

	ngAfterViewInit(): void {
		const hammer = new Hammer(this.textSlider.nativeElement)
		hammer.on('swipeleft', () => this.prev())
		hammer.on('swiperight', () => this.next())
	}

	getProgressWidth(): string {
		return ((this.currentIdx + 1) / this.sliderTextData.length) * 100 + '%'
	}
}
