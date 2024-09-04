import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AgentPaymentsDrawerComponent} from './agent-payments-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentPaymentsDrawerService} from './agent-payments-drawer.service'

@NgModule({
	declarations: [AgentPaymentsDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [AgentPaymentsDrawerService]
})
export class AgentPaymentsDrawerModule {}
