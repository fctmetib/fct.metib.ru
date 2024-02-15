import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandLimitDrawerComponent} from './demand-limit-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DemandLimitDrawerService} from './demand-limit-drawer.service'

@NgModule({
	declarations: [DemandLimitDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [DemandLimitDrawerService]
})
export class DemandLimitDrawerModule {}
