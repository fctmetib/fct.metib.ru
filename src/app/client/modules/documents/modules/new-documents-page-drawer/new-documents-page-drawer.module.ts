import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewDocumentsPageDrawerComponent} from './new-documents-page-drawer.component'
import {NewDocumentsPageDrawerService} from './new-documents-page-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {CheckboxModule} from 'src/app/shared/ui-kit/checkbox/checkbox.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {TextareaModule} from 'src/app/shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {MatDialogModule} from '@angular/material/dialog'
import {ReactiveFormsModule} from '@angular/forms'
import {InformationModule} from 'src/app/shared/ui-kit/information/information.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'

@NgModule({
	declarations: [NewDocumentsPageDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		ButtonModule,
		IconModule,
		CheckboxModule,
		InputModule,
		MibDragAndDropModule,
		TextareaModule,
		AutosizeModule,
		SkeletonModule,
		ReactiveFormsModule,
		InformationModule,
		TableModule,
		DropdownPointModule,
		DropdownModule
	],
	providers: [NewDocumentsPageDrawerService]
})
export class NewDocumentsPageDrawerModule {}
