import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProtectedLayoutComponent } from './../shared/layouts/protected-layout/protected-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ProtectedLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
