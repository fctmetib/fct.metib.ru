import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
	selector: 'mib-modal-header',
	templateUrl: './modal-header.component.html',
	styleUrls: ['./modal-header.component.scss']
})
export class ModalHeaderComponent {
	@Input() title: string = ''
	@Input() showClose: boolean = true
	@Output() onClose = new EventEmitter()
}
