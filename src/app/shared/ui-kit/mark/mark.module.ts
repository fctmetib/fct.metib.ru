import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MarkComponent} from './mark.component'
import {IconModule} from '../ref-icon/icon.module'

@NgModule({
	declarations: [MarkComponent],
	imports: [CommonModule, IconModule],
	exports: [MarkComponent]
})
export class MarkModule {}
