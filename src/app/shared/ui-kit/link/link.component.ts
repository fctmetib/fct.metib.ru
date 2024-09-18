import {
	Component,
	ContentChildren,
	ElementRef,
	Input,
	QueryList,
	AfterContentInit,
	Output,
	EventEmitter
} from '@angular/core'
import {LinkSize, LinkType} from './interfaces/link.interface'
import {RightIconDirective} from '../../directives/right-icon/right-icon.directive'
import {LeftIconDirective} from '../../directives/left-icon/left-icon.directive'

@Component({
	selector: 'mib-link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss']
})
export class LinkComponent implements AfterContentInit {
	@ContentChildren(LeftIconDirective) leftIcons: QueryList<LeftIconDirective>
	@ContentChildren(RightIconDirective) rightIcons: QueryList<RightIconDirective>

	@Input() size: LinkSize = 'l'
	@Input() type: LinkType = 'ghost-primary'
	@Input() disabled: boolean = false
	@Input() showUnderline: boolean = false
	@Input() special: boolean = false
	@Output() press = new EventEmitter()

	ngAfterContentInit() {}

	get classes() {
		return {
			[`link_${this.size}`]: true,
			[`link_special`]: this.special,
			[`link_type-${this.type}`]: true,
			'link_left-iconly': this.leftIcons.length,
			'link_right-iconly': this.rightIcons.length
		}
	}
}
