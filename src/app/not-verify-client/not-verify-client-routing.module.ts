import { AuthGuard } from '../shared/services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotVerifyClientComponent } from './not-verify-client.component';

const routes = [
  {
    path: 'not-verify',
    component: NotVerifyClientComponent,
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
