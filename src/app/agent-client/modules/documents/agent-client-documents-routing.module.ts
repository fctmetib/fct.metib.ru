import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {DocumentsPageComponent} from './components/documents-page.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: DocumentsPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientDocumentsRoutingModule {}
