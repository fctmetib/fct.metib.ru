import { ConfirmPasswordPageComponent } from './components/confirm-password-page/confirm-password-page.component';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginedGuard } from './../shared/services/logined.guard';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './../shared/layouts/auth-layout/auth-layout.component';

const routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [LoginedGuard],
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent
      },
      {
        path: 'confirm-password/:id',
        component: ConfirmPasswordPageComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
