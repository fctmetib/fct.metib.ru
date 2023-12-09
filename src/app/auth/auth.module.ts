import {ConfirmPasswordPageComponent} from './components/confirm-password-page/confirm-password-page.component'
import {ResetPasswordPageComponent} from './components/reset-password-page/reset-password-page.component'
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
import {RegisterPageComponent} from './pages/register-page/register-page.component'
import {LoginPageComponent} from './pages/login-page/login-page.component'
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
    RightIconModule
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
