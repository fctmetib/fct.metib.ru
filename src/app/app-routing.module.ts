import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {NotFoundComponent} from './client/shared/not-found/not-found.component'
import {MibUiComponent} from './shared/modules/mib-ui/mib-ui.component'

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./public/public.module').then(m => m.PublicModule)
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'client',
		loadChildren: () =>
			import('./client/client.module').then(m => m.ClientModule)
	},
	{
		path: 'agent-client',
		loadChildren: () =>
			import('./agent-client/agent-client.module').then(
				m => m.AgentClientModule
			)
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
	},
	{path: 'ui-test', component: MibUiComponent},
	{path: '404', component: NotFoundComponent},
	{path: '**', redirectTo: '/404', pathMatch: 'full'}
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
