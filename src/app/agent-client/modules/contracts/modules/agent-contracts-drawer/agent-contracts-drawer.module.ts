import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AgentContractsDrawerComponent} from './agent-contracts-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentContractsDrawerService} from './agent-contracts-drawer.service'

@NgModule({
	declarations: [AgentContractsDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [AgentContractsDrawerService]
})
export class AgentContractsDrawerModule {}
