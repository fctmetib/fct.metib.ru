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
      // {
      //   path: 'demand',
      //   loadChildren: () => import('../shared/modules/demand/demand.module').then(m => m.DemandModule)
      // },
      {
        path: 'demand',
        loadChildren: () =>
          import('../shared/modules/demand-new/demand-new.module').then(
            (m) => m.DemandNewModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotVerifyClientRoutingModule {}
