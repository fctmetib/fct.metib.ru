import { ConfirmPasswordPageComponent } from './components/confirm-password-page/confirm-password-page.component';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginedGuard } from './../shared/services/logined.guard';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthComponent } from './auth.component';

const routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [LoginedGuard],
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        title: 'Авторизация'
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        title: 'Регистрация'
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent,
        title: 'Восстановление пароля'
      },
      {
        path: 'confirm-password/:id',
        component: ConfirmPasswordPageComponent,
        title: 'Подтверждение пароля'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
