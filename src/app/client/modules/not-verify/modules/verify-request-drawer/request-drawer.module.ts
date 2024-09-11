import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {VerifyRequestDrawerComponent} from './verify-request-drawer.component'
import {RequestDrawerService} from './request-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {MatDialogModule} from '@angular/material/dialog'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {TextareaModule} from 'src/app/shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {ReactiveFormsModule} from '@angular/forms'
import {InformationModule} from 'src/app/shared/ui-kit/information/information.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {FileCellModule} from 'src/app/shared/ui-kit/file-cell/file-cell.module'

@NgModule({
	declarations: [VerifyRequestDrawerComponent],
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
		DropdownModule,
		FileCellModule
	],
	providers: [RequestDrawerService]
})
export class RequestDrawerModule {}
