import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MibDragAndDropComponent} from './mib-drag-and-drop.component'
import {DropDirective} from './directives/drop.directive'
import {IconModule} from '../ref-icon/icon.module'
import {LinkModule} from '../link/link.module'
import {ButtonModule} from '../button/button.module'

@NgModule({
	declarations: [MibDragAndDropComponent, DropDirective],
	exports: [MibDragAndDropComponent],
	imports: [CommonModule, IconModule, LinkModule, ButtonModule]
})
export class MibDragAndDropModule {}
