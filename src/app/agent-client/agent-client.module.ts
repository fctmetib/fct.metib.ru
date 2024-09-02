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
import {AgentClientPaymentsModule} from './modules/payments/agent-client-payments.module'
import {AgentClientInvoicesPaymentModule} from './modules/invoices-payment/agent-client-invoices-payment.module'
import {AgentClientQueriesModule} from './modules/queries/agent-client-queries.module'
import {AgentClientContractsModule} from './modules/contracts/agent-client-contracts.module'
import {AgentClientReportsModule} from './modules/reports/agent-client-reports.module'
import {AgentClientPayAgentReportsModule} from './modules/pay-agent-reports/agent-client-pay-agent-reports.module'
import {AgentClientDocumentsModule} from './modules/documents/agent-client-documents.module'

@NgModule({
	declarations: [AgentClientComponent],
	imports: [
		CommonModule,
		AgentClientRoutingModule,
		AgentClientCabinetModule,
		SidebarModule,
		HeaderModule,
		SpacingModule
	]
})
export class AgentClientModule {}
