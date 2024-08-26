import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {PaymentsPageComponent} from './components/payments-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentClientPaymentsPageRoutingModule} from './agent-client-payments-page-routing.module'

@NgModule({
	declarations: [PaymentsPageComponent],
	imports: [CommonModule, AgentClientPaymentsPageRoutingModule, SpacingModule]
})
export class AgentClientPaymentsModule {}
