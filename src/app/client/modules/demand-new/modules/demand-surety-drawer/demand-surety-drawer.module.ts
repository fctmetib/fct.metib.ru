import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandSuretyDrawerComponent} from './demand-surety-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [DemandSuretyDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule]
})
export class DemandSuretyDrawerModule {}
