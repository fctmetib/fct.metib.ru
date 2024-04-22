import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CabinetNewsDrawerComponent} from './cabinet-news-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {CabinetNewsDrawerService} from './cabinet-news-drawer.service'

@NgModule({
	declarations: [CabinetNewsDrawerComponent],
	imports: [CommonModule, DrawerModule, MatDialogModule, SpacingModule],
	providers: [CabinetNewsDrawerService]
})
export class CabinetNewsDrawerModule {}
