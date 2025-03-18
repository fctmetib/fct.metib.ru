import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {DemandNewHomeComponent} from './pages/demand-new-home/demand-new-home.component'

const routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: DemandNewHomeComponent
			},
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DemandNewRoutingModule {}
