import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	Optional,
	Output
} from '@angular/core'
import {TagSize, TagStatus, TagType} from './interfaces/tag.interface'
import {TagsGroupComponent} from '../tags-group/tags-group.component'

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
	// @Output() onClick: EventEmitter<any> = new EventEmitter<any>()
	// @Output() press: EventEmitter<any> = new EventEmitter<any>()
	// TODO: ДОБАВИТЬ ПОЛЕ VALUE
	@Input() value?: string = ''

	selected: boolean = false

	constructor(@Optional() public group?: TagsGroupComponent) {}

	ngAfterViewInit() {
		if (this.disabled) this.status = 'disabled'
		this.group.value = this.value
	}

	toggle() {
		// TODO: СДЕЛАТЬ TagsGroup КОМПОНЕНТ, КОТОРЫЙ БУДЕТ РЕГУЛИРОВАТЬ ОТМЕЧЕННЫЕ ТЕГИ
		// TODO: МЕНЯТЬ СОСТОЯНИЕ ТЕГОВ ТОЛЬКО ПРИ НАЛИЧИИ this.tagsGroupComponent, В КРАЙНЕМ СЛУЧАЕ В ПО НАДОБНОСТИ ИНОЙ ЛОГИКИ
		if (this.group) {
			this.group?.select(this.value)
		}
		return
	}
}
