import { CryptoService } from './../shared/services/common/crypto.service';
import { ResetPasswordEffect } from './store/effects/resetPassword.effect';
import { ConfirmPasswordPageComponent } from './components/confirm-password-page/confirm-password-page.component';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { reducers } from './store/reducers';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { CommonService } from '../shared/services/common/common.service';
import { RegisterEffect } from './store/effects/register.effect';
import { BackendErrorMessagesModule } from './../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginEffect } from './store/effects/login.effect';
import { SuccessMessagesModule } from './../shared/modules/successMessages/successMessages.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './../shared/layouts/auth-layout/auth-layout.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    SuccessMessagesModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      LoginEffect,
      GetCurrentUserEffect,
      RegisterEffect,
      ResetPasswordEffect
    ]),
    InputTextModule,
    DropdownModule,
    CardModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    InputMaskModule,
  ],
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ResetPasswordPageComponent,
    ConfirmPasswordPageComponent
  ],
  providers: [AuthService, CommonService, CryptoService],
})
export class AuthModule {}