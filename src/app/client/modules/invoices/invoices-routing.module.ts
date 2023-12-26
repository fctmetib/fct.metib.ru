import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {InvoicesPageComponent} from './pages/invoices-page/invoices-page.component'

const routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: InvoicesPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InvoicesRoutingModule {}
