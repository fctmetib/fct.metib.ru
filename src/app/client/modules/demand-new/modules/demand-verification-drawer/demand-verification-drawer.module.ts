import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandVerificationDrawerComponent} from './demand-verification-drawer.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {DemandVerificationDrawerService} from './demand-verification-drawer.service'

@NgModule({
	declarations: [DemandVerificationDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [DemandVerificationDrawerService]
})
export class DemandVerificationDrawerModule {}
