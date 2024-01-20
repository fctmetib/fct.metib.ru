import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewContractsPageDrawerComponent} from './new-contracts-page-drawer.component'
import {NewContractsPageDrawerService} from './new-contracts-page-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {MatDialogModule} from '@angular/material/dialog'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'

@NgModule({
	declarations: [NewContractsPageDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		ButtonModule,
		IconModule,
		InputModule,
		SkeletonModule,
		TagModule
	],
	providers: [NewContractsPageDrawerService]
})
export class NewContractsPageDrawerModule {}
