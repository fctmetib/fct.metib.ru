import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {CreditorsPageComponent} from './components/creditors-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentClientCreditorsRoutingModule} from './agent-client-creditors-routing.module'

@NgModule({
	declarations: [CreditorsPageComponent],
	imports: [CommonModule, AgentClientCreditorsRoutingModule, SpacingModule]
})
export class AgentClientCreditorsModule {}
