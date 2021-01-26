import { RegisterEffect } from './store/effects/register.effect';
import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { BackendErrorMessagesModule } from './../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { CommonModule } from '@angular/common';
import { CommonService } from './../shared/services/common.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginEffect } from './store/effects/login.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './../shared/layouts/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      LoginEffect,
      GetCurrentUserEffect,
      RegisterEffect,
    ]),
  ],
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  providers: [AuthService, CommonService],
})
export class AuthModule {}
