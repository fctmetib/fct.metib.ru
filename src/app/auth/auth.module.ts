import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {CardModule} from 'primeng/card'
import {ButtonModule as ButtonModule22} from 'primeng/button'
import {MessagesModule} from 'primeng/messages'
import {MessageModule} from 'primeng/message'
import {InputMaskModule} from 'primeng/inputmask'
import {InputTextModule} from 'primeng/inputtext'
import {DropdownModule} from 'primeng/dropdown'
import {ProgressSpinnerModule} from 'primeng/progressspinner'

import {CommonService} from '../shared/services/common/common.service'
import {RegisterPageComponent} from './pages/register/register-page.component'
import {LoginPageComponent} from './pages/login/login-page.component'
import {AuthRoutingModule} from './auth-routing.module'
import {AuthComponent} from './auth.component'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {AuthInterceptor} from './services/auth.interceptor'
import {TooltipModule} from 'primeng/tooltip'
import {HeaderModule} from '../shared/modules/header/header.module'
import {SpacingModule} from '../shared/ui-kit/spacing/spacing.module'
import {InputModule} from '../shared/ui-kit/input/input.module'
import {RefIconModule} from '../shared/ui-kit/ref-icon/ref-icon.module'
import {LinkModule} from '../shared/ui-kit/link/link.module'
import {ButtonModule} from '../shared/ui-kit/button/button.module'
import {NgxMaskModule} from 'ngx-mask';
import {RightIconModule} from '../shared/directives/right-icon/right-icon.module';
import {PasswordHiderModule} from '../shared/directives/password-hider/password-hider.module';
import {SelectModule} from '../shared/ui-kit/select/select.module';
import {DropdownPointModule} from '../shared/ui-kit/dropdown-point/dropdown-point.module';
import {LeftIconModule} from '../shared/directives/left-icon/left-icon.module';
import {ResetPasswordPageComponent} from './pages/reset-password/reset-password-page.component';
import {ConfirmPasswordPageComponent} from './pages/confirm-password/confirm-password-page.component';
import {SmsConfirmationModule} from './modules/sms-confirmation/sms-confirmation.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ProgressSpinnerModule,
    ButtonModule22,
    CardModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    InputMaskModule,
    TooltipModule,
    HeaderModule,
    SpacingModule,
    InputModule,
    RefIconModule,
    LinkModule,
    NgxMaskModule.forRoot(),
    RightIconModule,
    PasswordHiderModule,
    SelectModule,
    DropdownPointModule,
    LeftIconModule,
    SmsConfirmationModule
  ],
  declarations: [
    AuthComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ResetPasswordPageComponent,
    ConfirmPasswordPageComponent
  ],
  providers: [
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {
}
