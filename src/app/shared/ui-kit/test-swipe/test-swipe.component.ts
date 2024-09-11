import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'

@Component({
	selector: 'mib-test-swipe',
	templateUrl: './test-swipe.component.html',
	styleUrls: ['./test-swipe.component.scss']
})
export class TestSwipeComponent implements AfterViewInit {
	menuItems = [
		'Home',
		'About',
		'Services',
		'Contact',
		'Blog',
		'Portfolio',
		'Careers'
	]

	@ViewChild('menuContainer', {static: true}) menuContainer: ElementRef

	ngAfterViewInit() {
		this.updateShadows()
		this.menuContainer.nativeElement.addEventListener('scroll', () =>
			this.updateShadows()
		)
	}

	onSwipe(event: any) {
		const container = this.menuContainer.nativeElement
		const direction = event.deltaX > 0 ? 'right' : 'left'
		if (direction === 'left') {
			container.scrollLeft += 100
		} else if (direction === 'right') {
			container.scrollLeft -= 100
		}
		this.updateShadows()
	}

	updateShadows() {
		const container = this.menuContainer.nativeElement
		const shadowLeft = container.parentElement.querySelector('.shadow-left')
		const shadowRight = container.parentElement.querySelector('.shadow-right')

		if (container.scrollLeft === 0) {
			shadowLeft.classList.add('hide-shadow')
		} else {
			shadowLeft.classList.remove('hide-shadow')
		}

		if (
			container.scrollWidth - container.scrollLeft ===
			container.clientWidth
		) {
			shadowRight.classList.add('hide-shadow')
		} else {
			shadowRight.classList.remove('hide-shadow')
		}
	}
}
