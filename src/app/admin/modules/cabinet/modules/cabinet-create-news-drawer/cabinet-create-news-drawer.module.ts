import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CabinetCreateNewsDrawerComponent} from './cabinet-create-news-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {CabinetCreateNewsDrawerService} from './cabinet-create-news-drawer.service'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {TextareaModule} from 'src/app/shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {ReactiveFormsModule} from '@angular/forms'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import { TextEditorModule } from 'src/app/shared/ui-kit/text-editor/text-editor.module'

@NgModule({
	declarations: [CabinetCreateNewsDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		InputModule,
		TextEditorModule,
		LabelModule,
		IconModule,
		MibDragAndDropModule,
		TextareaModule,
		AutosizeModule,
		ButtonModule,
		ReactiveFormsModule,
		SkeletonModule
	],
	providers: [CabinetCreateNewsDrawerService]
})
export class CabinetCreateNewsDrawerModule {}
