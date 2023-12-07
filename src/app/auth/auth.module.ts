import { ConfirmPasswordPageComponent } from './components/confirm-password-page/confirm-password-page.component'
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { CommonService } from '../shared/services/common/common.service'
import { RegisterPageComponent } from './components/register-page/register-page.component'
import { LoginPageComponent } from './components/login-page/login-page.component'
import { AuthRoutingModule } from './auth-routing.module'
import { AuthComponent } from './auth.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './services/auth.interceptor'
import { TooltipModule } from 'primeng/tooltip'

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
		CardModule,
		MessageModule,
		MessagesModule,
		ButtonModule,
		InputMaskModule,
		TooltipModule
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
export class AuthModule {}
