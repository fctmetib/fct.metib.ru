import {Component, Input} from '@angular/core'
import {BreadcrumbSize} from './interfaces/breadcrumb.interface'

@Component({
	selector: 'mib-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
	@Input() selected: boolean = false
	@Input() size: BreadcrumbSize = 'm'
	@Input() text: string = ''

	get classes() {
		return {
			[`breadcrumb-${this.size}`]: true,
			[`selected`]: this.selected
		}
	}
}
