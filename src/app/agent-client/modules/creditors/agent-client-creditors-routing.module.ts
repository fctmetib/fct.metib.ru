import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CreditorsPageComponent} from './components/creditors-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: CreditorsPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientCreditorsRoutingModule {}
