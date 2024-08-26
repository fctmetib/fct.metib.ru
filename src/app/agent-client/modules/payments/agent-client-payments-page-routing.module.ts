import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PaymentsPageComponent} from './components/payments-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: PaymentsPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientPaymentsPageRoutingModule {}
