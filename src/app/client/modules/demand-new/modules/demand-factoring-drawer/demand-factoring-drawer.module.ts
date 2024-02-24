import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandFactoringDrawerComponent} from './demand-factoring-drawer.component'
import {DemandFactoringDrawerService} from './demand-factoring-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'

@NgModule({
	declarations: [DemandFactoringDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule, ButtonModule],
	providers: [DemandFactoringDrawerService]
})
export class DemandFactoringDrawerModule {}
