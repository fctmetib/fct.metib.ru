import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FreeDutyRequestDrawerComponent} from './free-duty-request-drawer.component'
import {DrawerModule} from '../../../../../shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from '../../../../../shared/ui-kit/spacing/spacing.module'
import {TableModule} from '../../../../../shared/ui-kit/table/table.module'
import {ButtonModule} from '../../../../../shared/ui-kit/button/button.module'
import {IconModule} from '../../../../../shared/ui-kit/ref-icon/icon.module'
import {SelectModule} from '../../../../../shared/ui-kit/select/select.module'
import {DropdownPointModule} from '../../../../../shared/ui-kit/dropdown-point/dropdown-point.module'
import {ReactiveFormsModule} from '@angular/forms'
import {CheckboxModule} from '../../../../../shared/ui-kit/checkbox/checkbox.module'
import {PaginatorModule} from '../../../../../shared/ui-kit/paginator/paginator.module'
import {FreeDutyRequestDrawerService} from './free-duty-request-drawer.service'

@NgModule({
	declarations: [FreeDutyRequestDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		TableModule,
		ButtonModule,
		IconModule,
		SelectModule,
		DropdownPointModule,
		ReactiveFormsModule,
		CheckboxModule,
		PaginatorModule
	],
	providers: [FreeDutyRequestDrawerService]
})
export class FreeDutyRequestDrawerModule {}
