import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './client/shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    path: '',
    loadChildren: () => import('./not-verify-client/not-verify-client.module').then((m) => m.NotVerifyClientModule),
  },
  {
    path: '',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', initialNavigation: 'enabledBlocking'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
