import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PaymentRegisterPageComponent} from './components/payment-register-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: PaymentRegisterPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientPaymentRegisterRoutingModule {}
