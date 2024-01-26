import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input, Optional,
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
  // TODO: ДОБАВИТЬ ПОЛЕ VALUE

	selected: boolean = false

  constructor(
    // TODO: ИНТЕГРИРОВАТЬ КОМПОНЕНТ ГРУППЫ, КАК ТОЛЬКО ОН БУДЕТ СДЕЛАН
    // @Optional() private TagsGroupComponent: TagsGroupComponent
  ) {
  }

	ngAfterViewInit() {
		if (this.disabled) this.status = 'disabled'
	}

  toggle($event: MouseEvent) {
    // TODO: СДЕЛАТЬ TagsGroup КОМПОНЕНТ, КОТОРЫЙ БУДЕТ РЕГУЛИРОВАТЬ ОТМЕЧЕННЫЕ ТЕГИ
    // TODO: МЕНЯТЬ СОСТОЯНИЕ ТЕГОВ ТОЛЬКО ПРИ НАЛИЧИИ this.tagsGroupComponent, В КРАЙНЕМ СЛУЧАЕ В ПО НАДОБНОСТИ ИНОЙ ЛОГИКИ
    // this.selected = !this.selected
    this.press.emit($event)
  }
}
