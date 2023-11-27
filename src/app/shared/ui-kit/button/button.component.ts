import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	DoCheck,
	EventEmitter,
	Input,
	Output
} from '@angular/core'
import { ButtonSize, ButtonType } from '../button/interfaces/button.interface'

@Component({
	selector: 'mib-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit, DoCheck {
	@Input() size: ButtonSize = 'l'
	@Input() type: ButtonType = 'filled-primary'
	@Input() rounded: boolean = false
	@Input() loading: boolean = false
	@Input() disabled: boolean = false
	@Output() press: EventEmitter<any> = new EventEmitter<any>()

	constructor(private cdr: ChangeDetectorRef) {}

	ngAfterViewInit() {
		this.cdr.detectChanges()
	}

	ngDoCheck() {
		this.cdr.detectChanges()
	}
}
