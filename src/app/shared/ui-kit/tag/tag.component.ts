import {
  AfterViewInit,
  Component,
  EventEmitter, inject,
  Input,
  Optional,
  Output
} from '@angular/core';
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
	@Input() default?: boolean = false
	@Input() value?: string = ''

  group = inject(TagsGroupComponent, {optional: true})

	ngAfterViewInit() {
		if (this.disabled) this.status = 'disabled'
		// if (this.default) {
		// 	this.toggle()
		// }
		// this.group.value = this.value
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
