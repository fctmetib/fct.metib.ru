import {AfterContentInit, Component, Input} from '@angular/core'

@Component({
	selector: 'mib-tags-group',
	templateUrl: './tags-group.component.html',
	styleUrls: ['./tags-group.component.scss']
})
export class TagsGroupComponent {
	public value?: string

	constructor() {}

	match(value: string) {
		return value === this.value
	}

	select(value: string) {
		this.value = value
	}
}
