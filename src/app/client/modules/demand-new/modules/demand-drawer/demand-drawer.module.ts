import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandDrawerComponent} from './demand-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {DemandDrawerService} from './demand-drawer.service'
import {TextareaModule} from '../../../../../shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {LabelModule} from '../../../../../shared/directives/label/label.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {ReactiveFormsModule} from '@angular/forms'
import {InformationModule} from 'src/app/shared/ui-kit/information/information.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'

@NgModule({
	declarations: [DemandDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		ButtonModule,
		IconModule,
		MibDragAndDropModule,
		InputModule,
		TextareaModule,
		AutosizeModule,
		LabelModule,
		SkeletonModule,
		ReactiveFormsModule,
		InformationModule,
		TableModule,
		DropdownPointModule,
		DropdownModule
	],
	providers: [DemandDrawerService]
})
export class DemandDrawerModule {}
