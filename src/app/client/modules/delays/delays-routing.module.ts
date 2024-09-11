import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {NewDelaysComponent} from './pages/new-delays/new-delays.component'

const routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: NewDelaysComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DelaysRoutingModule {}
