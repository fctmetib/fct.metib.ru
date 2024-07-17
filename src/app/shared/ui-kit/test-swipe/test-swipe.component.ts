import {Component} from '@angular/core'

@Component({
	selector: 'mib-test-swipe',
	templateUrl: './test-swipe.component.html',
	styleUrls: ['./test-swipe.component.scss']
})
export class TestSwipeComponent {
	menuItems = ['Home', 'About', 'Services', 'Contact']

	onSwipe(event: any) {
		const container = document.getElementById('menu-container')
		const direction = event.deltaX > 0 ? 'right' : 'left'
		if (direction === 'left') {
			container.scrollLeft += 100
		} else if (direction === 'right') {
			container.scrollLeft -= 100
		}
	}
}
