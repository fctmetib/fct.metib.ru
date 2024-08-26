import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {PaymentRegisterPageComponent} from './components/payment-register-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentClientPaymentRegisterRoutingModule} from './agent-client-payment-register-routing.module'

@NgModule({
	declarations: [PaymentRegisterPageComponent],
	imports: [
		CommonModule,
		AgentClientPaymentRegisterRoutingModule,
		SpacingModule
	]
})
export class AgentClientPaymentRegisterModule {}
