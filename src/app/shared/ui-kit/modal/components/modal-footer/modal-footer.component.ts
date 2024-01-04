import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
	selector: 'mib-modal-footer',
	templateUrl: './modal-footer.component.html',
	styleUrls: ['./modal-footer.component.scss']
})
export class ModalFooterComponent {
	@Input() btnLeftText: string = ''
	@Input() btnRightText: string = ''
	@Output() onPressRightBtn = new EventEmitter()
	@Output() onPressLeftBtn = new EventEmitter()
}
