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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
