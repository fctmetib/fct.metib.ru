import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AuthGuard} from '../shared/services/auth.guard'
import {UserVerifyGuard} from '../shared/services/user-verify.guard'
import {AgentClientComponent} from './agent-client.component'

const routes: Routes = [
	{
		path: '',
		component: AgentClientComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				canActivateChild: [UserVerifyGuard],
				children: [
					{
						path: 'cabinet',
						loadChildren: () =>
							import('./modules/agent-client-cabinet.module').then(
								m => m.AgentClientCabinetModule
							),
						title: 'Агентский Факторинг | Кабинет'
					}
				]
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientRoutingModule {}
