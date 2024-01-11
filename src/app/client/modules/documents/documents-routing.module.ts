import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {NewDocumentsPageComponent} from './pages/new-documents-page/new-documents-page.component'

const routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: NewDocumentsPageComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DocumentsRoutingModule {}
