import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CabinetPageComponent} from './components/cabinet-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: CabinetPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientCabinetRoutingModule {}
