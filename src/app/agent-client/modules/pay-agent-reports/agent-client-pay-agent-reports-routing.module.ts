import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PayAgentReportsPageComponent} from './components/pay-agent-reports-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: PayAgentReportsPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientPayAgentReportsRoutingModule {}
