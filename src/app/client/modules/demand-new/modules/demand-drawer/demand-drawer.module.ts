import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DemandDrawerComponent } from './demand-drawer.component'
import { DrawerModule } from 'src/app/shared/ui-kit/drawer/drawer.module'
import { MatDialogModule } from '@angular/material/dialog'
import { SpacingModule } from 'src/app/shared/ui-kit/spacing/spacing.module'
import { ButtonModule } from 'src/app/shared/ui-kit/button/button.module'
import { RefIconModule } from 'src/app/shared/ui-kit/ref-icon/ref-icon.module'
import { InputModule } from 'src/app/shared/ui-kit/input/input.module'
import { MibDragAndDropModule } from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import { DemandDrawerService } from './demand-drawer.service'

@NgModule({
	declarations: [DemandDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		ButtonModule,
		RefIconModule,
		InputModule,
		MibDragAndDropModule
	],
	providers: [DemandDrawerService]
})
export class DemandDrawerModule {}
