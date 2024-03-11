import {
	AfterContentInit,
	Component,
	ContentChild,
	ContentChildren,
	EventEmitter,
	Input,
	Output,
	QueryList
} from '@angular/core'
import {TagComponent} from '../tag/tag.component'
import {pipe, startWith, takeUntil, tap} from 'rxjs'
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service'

@Component({
	selector: 'mib-tags-group',
	templateUrl: './tags-group.component.html',
	styleUrls: ['./tags-group.component.scss'],
	providers: [AutoUnsubscribeService]
})
export class TagsGroupComponent implements AfterContentInit {
	public value?: string

	@Output() onChange = new EventEmitter<string>()

	@ContentChildren(TagComponent, {
		descendants: true
	})
	public tags: QueryList<TagComponent>

	constructor(private au: AutoUnsubscribeService) {}

	ngAfterContentInit(): void {
		this.tags.changes
			.pipe(
				startWith(null),
				tap(() => {
					const tag = this.tags.get(0)
					if (tag) {
						this.select(tag.value)
					}
				}),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
	}

	match(value: string) {
		return value === this.value
	}

	select(value: string) {
		this.value = value
		this.onChange.emit(value)
	}
}
