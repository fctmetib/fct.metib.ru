import {Component, EventEmitter, Input, Output} from '@angular/core'
import {DlFileCellSize} from './interfaces/dl-file-cell.interface'

@Component({
	selector: 'mib-dl-file-cell',
	templateUrl: './dl-file-cell.component.html',
	styleUrls: ['./dl-file-cell.component.scss']
})
export class DlFileCellComponent {
	@Input() size: DlFileCellSize = 'm'
	@Input() fileSize = ''
	@Input() fileName = ''
	@Input() showRemove: boolean = false
	@Output() onDload = new EventEmitter()
	@Output() onRemove = new EventEmitter()

	get classes() {
		return {
			[`dl-file_size-${this.size}`]: true
		}
	}
}
