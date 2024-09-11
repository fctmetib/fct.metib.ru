import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TagsGroupComponent} from './tags-group.component'

@NgModule({
	declarations: [TagsGroupComponent],
	exports: [TagsGroupComponent],
	imports: [CommonModule]
})
export class TagsGroupModule {}
