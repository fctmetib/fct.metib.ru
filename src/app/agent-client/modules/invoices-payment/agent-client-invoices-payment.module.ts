import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientInvoicesPaymentRoutingModule} from './agent-client-invoices-payment-routing.module'
import {InvoicesPaymentPageComponent} from './components/invoices-payment-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [InvoicesPaymentPageComponent],
	imports: [
		CommonModule,
		AgentClientInvoicesPaymentRoutingModule,
		SpacingModule
	]
})
export class AgentClientInvoicesPaymentModule {}
