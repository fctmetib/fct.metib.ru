import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ReportsPageComponent} from './components/reports-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: ReportsPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientReportsRoutingModule {}
