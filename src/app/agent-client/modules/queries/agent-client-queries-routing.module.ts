import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {QueriesPageComponent} from './components/queries-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: QueriesPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientQueriesRoutingModule {}
