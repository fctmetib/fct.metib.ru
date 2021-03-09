import { AuthGuard } from './../shared/services/auth.guard';
import { ClientLayoutComponent } from '../shared/layouts/client-layout/client-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserVerifyGuard } from '../shared/services/user-verify.guard';

const routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    canActivate: [AuthGuard, UserVerifyGuard],
    children: [
      {
        path: 'cabinet',
        loadChildren: () => import('./modules/cabinet/cabinet.module').then(m => m.CabinetModule),
      },
      {
        path: 'requests',
        loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestModule),
      },
      {
        path: 'freeduty',
        loadChildren: () => import('./modules/freeduty/freeduty.module').then(m => m.FreedutyModule),
      },
      {
        path: 'invoices',
        loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule),
      },
      {
        path: 'contracts',
        loadChildren: () => import('./modules/contracts/contracts.module').then(m => m.ContractsModule),
      },
      {
        path: 'documents',
        loadChildren: () => import('./modules/documents/documents.module').then(m => m.DocumentsModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: 'demand',
        loadChildren: () => import('../shared/modules/demand/demand.module').then(m => m.DemandModule)
      },
      {
        path: 'delays',
        loadChildren: () => import('./modules/delays/delays.module').then(m => m.DelaysModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
