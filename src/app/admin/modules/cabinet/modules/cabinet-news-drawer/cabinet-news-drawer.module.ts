import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CabinetNewsDrawerComponent} from './cabinet-news-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {CabinetNewsDrawerService} from './cabinet-news-drawer.service'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'

@NgModule({
	declarations: [CabinetNewsDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		InputModule,
		LabelModule,
		IconModule,
		MibDragAndDropModule
	],
	providers: [CabinetNewsDrawerService]
})
export class CabinetNewsDrawerModule {}
