import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {InvoicesPaymentPageComponent} from './components/invoices-payment-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: InvoicesPaymentPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientInvoicesPaymentRoutingModule {}
