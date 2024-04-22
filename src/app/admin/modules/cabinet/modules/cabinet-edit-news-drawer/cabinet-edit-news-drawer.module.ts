import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CabinetEditNewsDrawerComponent} from './cabinet-edit-news-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {CabinetEditNewsDrawerService} from './cabinet-edit-news-drawer.service'

@NgModule({
	declarations: [CabinetEditNewsDrawerComponent],
	imports: [CommonModule, DrawerModule, MatDialogModule, SpacingModule],
	providers: [CabinetEditNewsDrawerService]
})
export class CabinetEditNewsDrawerModule {}
