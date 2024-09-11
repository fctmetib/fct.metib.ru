import {Component, EventEmitter, Input, Output} from '@angular/core'
import {
	MobileTablePopupCellSize,
	MobileTablePopupCellType
} from './interfaces/mobile-table-popup-cell.interface'

@Component({
	selector: 'mib-mobile-table-popup-cell',
	templateUrl: './mobile-table-popup-cell.component.html',
	styleUrls: ['./mobile-table-popup-cell.component.scss']
})
export class MobileTablePopupCellComponent {
	@Input() set size(value: MobileTablePopupCellSize) {
		this._size = value
	}
	@Input() title: string = ''
	@Input() sectionTitle: string = ''
	@Input() badgeText: string = ''
	@Input() type: MobileTablePopupCellType = 'text'
	@Input() contracted: boolean = false
	@Input() showCopy: boolean = false
	@Output() copyData = new EventEmitter<any>()

	public _size: MobileTablePopupCellSize = 'm'

	get classes() {
		return {
			[`mib-mobile-popup-cell_type-${this.type}`]: true,
			[`mib-mobile-popup-cell_size-${this._size}`]: true
		}
	}
}
