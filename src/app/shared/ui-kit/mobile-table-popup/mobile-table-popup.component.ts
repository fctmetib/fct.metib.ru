import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
	selector: 'mib-mobile-table-popup',
	templateUrl: './mobile-table-popup.component.html',
	styleUrls: ['./mobile-table-popup.component.scss']
})
export class MobileTablePopupComponent {
	@Input() title: string = ''
	@Input() editable: boolean = false
	@Output() onEdit = new EventEmitter()
}
