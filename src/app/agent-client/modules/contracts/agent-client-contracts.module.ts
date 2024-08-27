import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientContractsRoutingModule} from './agent-client-contracts-routing.module'
import {ContractsPageComponent} from './components/contracts-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [ContractsPageComponent],
	imports: [CommonModule, AgentClientContractsRoutingModule, SpacingModule]
})
export class AgentClientContractsModule {}
