import { ReportsPageComponent } from './reports-page/reports-page.component';
import { DocumentsPageComponent } from './documents-page/documents-page.component';
import { ContractsPageComponent } from './contracts-page/contracts-page.component';
import { InvoicesPageComponent } from './invoices-page/invoices-page.component';
import { RequestsPageComponent } from './requests-page/requests-page.component';
import { AuthGuard } from './../shared/services/auth.guard';
import { CabinetPageComponent } from './cabinet-page/cabinet-page.component';
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
        component: CabinetPageComponent,
      },
      {
        path: 'requests',
        component: RequestsPageComponent,
      },
      {
        path: 'invoices',
        component: InvoicesPageComponent,
      },
      {
        path: 'contracts',
        component: ContractsPageComponent,
      },
      {
        path: 'documents',
        component: DocumentsPageComponent,
      },
      {
        path: 'reports',
        component: ReportsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
