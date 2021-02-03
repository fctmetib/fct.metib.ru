import { AuthGuard } from './../shared/services/auth.guard';
import { ProtectedLayoutComponent } from './../shared/layouts/protected-layout/protected-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ProtectedLayoutComponent,
    canActivate: [AuthGuard],
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
