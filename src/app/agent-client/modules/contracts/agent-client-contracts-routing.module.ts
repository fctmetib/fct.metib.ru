import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ContractsPageComponent} from './components/contracts-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: ContractsPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientContractsRoutingModule {}
