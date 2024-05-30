import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {NotVerifyComponent} from './pages/not-verify/not-verify.component'

const routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: NotVerifyComponent,
				title: 'Верификация | Запросы'
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class NotVerifyRoutingModule {}
