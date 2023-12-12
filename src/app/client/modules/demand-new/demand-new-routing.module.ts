import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DemandActionComponent } from './containers/demand-action/demand-action.component'
import { DemandActionsComponent } from './containers/demand-actions/demand-actions.component'
import { DemandHistoryComponent } from './containers/demand-history/demand-history.component'
import { DemandNewHomeComponent } from './pages/demand-new-home/demand-new-home.component'

const routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: DemandActionsComponent
			},
			{
				path: 'demand-action',
				component: DemandActionComponent
			},
			{
				path: 'history',
				component: DemandHistoryComponent
			},
			{
				path: 'home',
				component: DemandNewHomeComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DemandNewRoutingModule {}
