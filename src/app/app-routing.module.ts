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
		path: '',
		loadChildren: () =>
			import('./client/client.module').then(m => m.ClientModule)
	},
	{
		path: '',
		loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
	},
	{path: 'ui-test', component: MibUiComponent},
	{path: '404', component: NotFoundComponent},
	{path: '**', redirectTo: '/404', pathMatch: 'full'}
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			initialNavigation: 'enabledBlocking'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
