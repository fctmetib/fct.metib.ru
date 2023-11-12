import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
	ButtonColor,
	ButtonSize,
	ButtonType
} from '../button/interfaces/button.interface'

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Input() size: ButtonSize = 'l'
	@Input() type: ButtonType = 'filled'
	@Input() color: ButtonColor = 'primary'
	@Input() rounded: boolean = false
	@Input() loading: boolean = false
	@Input() disabled: boolean = false
	@Output() press: EventEmitter<any> = new EventEmitter<any>()

	ngAfterViewInit() {
		console.log('ngAfterViewInit>>>')
	}

	ngDoCheck() {
		console.log('ngDoCheck>>>')
	}
}
