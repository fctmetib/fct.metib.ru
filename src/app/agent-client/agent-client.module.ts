import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientRoutingModule} from './agent-client-routing.module'
import {AgentClientCabinetModule} from './modules/cabinet/agent-client-cabinet.module'
import {AgentClientComponent} from './agent-client.component'
import {SidebarModule} from '../shared/ui-kit/sidebar/sidebar.module'
import {HeaderModule} from '../shared/modules/header/header.module'
import {SpacingModule} from '../shared/ui-kit/spacing/spacing.module'
import {AgentClientRegisterModule} from './modules/register/agent-client-register.module'
import {AgentClientPaymentRegisterModule} from './modules/payment-register/agent-client-payment-register.module'
import {AgentClientCreditorsModule} from './modules/creditors/agent-client-creditors.module'
import {AgentClientPaymentsModule} from './modules/payments/agent-client-payments.module';
import { AgentClientInvoicesPaymentModule } from './modules/invoices-payment/agent-client-invoices-payment.module'

@NgModule({
	declarations: [AgentClientComponent],
	imports: [
		CommonModule,
		AgentClientRoutingModule,
		AgentClientCabinetModule,
		SidebarModule,
		HeaderModule,
		SpacingModule,
		AgentClientRegisterModule,
		AgentClientPaymentRegisterModule,
		AgentClientCreditorsModule,
		AgentClientPaymentsModule,
  AgentClientInvoicesPaymentModule
	]
})
export class AgentClientModule {}
