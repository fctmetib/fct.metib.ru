import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {NewContractsPageComponent} from './pages/new-contracts-page/new-contracts-page.component'

const routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: NewContractsPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContractsRoutingModule {}
