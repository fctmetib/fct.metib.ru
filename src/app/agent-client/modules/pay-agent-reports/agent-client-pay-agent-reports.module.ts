import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientPayAgentReportsRoutingModule} from './agent-client-pay-agent-reports-routing.module'
import {PayAgentReportsPageComponent} from './components/pay-agent-reports-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [PayAgentReportsPageComponent],
	imports: [
		CommonModule,
		AgentClientPayAgentReportsRoutingModule,
		SpacingModule
	]
})
export class AgentClientPayAgentReportsModule {}
