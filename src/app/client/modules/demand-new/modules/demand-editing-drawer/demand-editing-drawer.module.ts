import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandEditingDrawerComponent} from './demand-editing-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DemandEditingDrawerService} from './demand-editing-drawer.service'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {CheckboxModule} from 'src/app/shared/ui-kit/checkbox/checkbox.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {FileCellModule} from 'src/app/shared/ui-kit/file-cell/file-cell.module'

@NgModule({
	declarations: [DemandEditingDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		SpacingModule,
		ButtonModule,
		InputModule,
		LabelModule,
		CheckboxModule,
		MibDragAndDropModule,
		SelectModule,
		DropdownPointModule,
		FileCellModule
	],
	providers: [DemandEditingDrawerService]
})
export class DemandEditingDrawerModule {}
