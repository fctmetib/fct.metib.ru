import { NotVerifyClientLayoutComponent } from './../shared/layouts/not-verify-client-layout/not-verify-client-layout.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'not-verify',
    component: NotVerifyClientLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'demand',
        loadChildren: () => import('../shared/modules/demand/demand.module').then(m => m.DemandModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotVerifyClientRoutingModule {}
