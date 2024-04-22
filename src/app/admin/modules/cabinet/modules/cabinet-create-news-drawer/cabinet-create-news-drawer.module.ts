import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CabinetCreateNewsDrawerComponent} from './cabinet-create-news-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {CabinetCreateNewsDrawerService} from './cabinet-create-news-drawer.service'

@NgModule({
	declarations: [CabinetCreateNewsDrawerComponent],
	imports: [CommonModule, DrawerModule, MatDialogModule, SpacingModule],
	providers: [CabinetCreateNewsDrawerService]
})
export class CabinetCreateNewsDrawerModule {}
