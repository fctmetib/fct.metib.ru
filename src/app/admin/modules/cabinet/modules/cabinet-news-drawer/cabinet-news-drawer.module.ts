import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CabinetNewsDrawerComponent} from './cabinet-news-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {CabinetNewsDrawerService} from './cabinet-news-drawer.service'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {LeftIconModule} from 'src/app/shared/directives/left-icon/left-icon.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'

@NgModule({
	declarations: [CabinetNewsDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		TagModule,
		ButtonModule,
		LeftIconModule,
		IconModule
	],
	providers: [CabinetNewsDrawerService]
})
export class CabinetNewsDrawerModule {}
