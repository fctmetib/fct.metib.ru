import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from '../shared/layouts/admin-layout/admin-layout.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { AdminComponent } from './pages/admin/containers/admin.component';

const routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminComponent,
      },
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AdminLayoutComponent,
    AdminComponent
  ],
  providers: [],
})
export class AdminModule { }
