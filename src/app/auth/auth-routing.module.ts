import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginedGuard} from '../shared/services/logined.guard';
import {RegisterPageComponent} from './pages/register/register-page.component';
import {LoginPageComponent} from './pages/login/login-page.component';
import {AuthComponent} from './auth.component';
import {ResetPasswordPageComponent} from './pages/reset-password/reset-password-page.component';
import {ConfirmPasswordPageComponent} from './pages/confirm-password/confirm-password-page.component';

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
export class AuthRoutingModule {
}
