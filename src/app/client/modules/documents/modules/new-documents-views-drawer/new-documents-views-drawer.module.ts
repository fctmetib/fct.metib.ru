import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewDocumentsViewsDrawerComponent} from './new-documents-views-drawer.component'
import {NewDocumentsViewsDrawerService} from './new-documents-views-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'

@NgModule({
	declarations: [NewDocumentsViewsDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		ButtonModule,
		IconModule,
		InputModule,
		SkeletonModule
	],
	providers: [NewDocumentsViewsDrawerService]
})
export class NewDocumentsViewsDrawerModule {}
