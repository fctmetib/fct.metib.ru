import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {DocumentsPageComponent} from './pages/documents-page/documents-page.component'

const routes = [
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
export class DocumentsRoutingModule {}
