import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {LocalStorageService} from '../shared/services/common/localstorage.service'

@Component({
	selector: 'public',
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.scss'],
	encapsulation: ViewEncapsulation.Emulated
})
export class PublicComponent implements OnInit {
	isOpen: boolean = false
	constructor() {}

	ngOnInit(): void {}

	openBurgerMenu() {
		this.isOpen = !this.isOpen
		console.log('HALO BURGER>>>', this.isOpen)
	}

	closeBurgerMenu() {
		this.isOpen = !this.isOpen
	}

	ngOnDestroy() {}
}
