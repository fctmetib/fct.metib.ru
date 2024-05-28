import {Component, Input} from '@angular/core'

@Component({
	selector: 'mib-mobile-menu',
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
	@Input() isClient: boolean = false
	public isOpen: Boolean = false

	public onBurger() {
		this.isOpen = !this.isOpen
	}

	public closeBurgerMenu() {
		this.isOpen = !this.isOpen
	}
}
