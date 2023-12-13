import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	Output
} from '@angular/core'
import { TagSize, TagStatus, TagType } from './interfaces/tag.interface'

@Component({
	selector: 'mib-tag',
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.scss']
})
export class TagComponent implements AfterViewInit {
	@Input() size: TagSize = 'l'
	@Input() status: TagStatus = 'default'
	@Input() flex: string = 'flex_center'
	@Input() type: TagType = 'filled-primary'
	@Input() disabled: boolean = false
	@Output() onClick: EventEmitter<any> = new EventEmitter<any>()
	@Output() press: EventEmitter<any> = new EventEmitter<any>()

	selected: boolean = false

	ngAfterViewInit() {
		if (this.disabled) this.status = 'disabled'
	}
}