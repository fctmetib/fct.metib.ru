import {ClientModule} from './client/client.module'

import {AuthModule} from './auth/auth.module'
import {
	BrowserModule,
	makeStateKey,
	TransferState
} from '@angular/platform-browser'
import {APP_INITIALIZER, LOCALE_ID, NgModule, PLATFORM_ID} from '@angular/core'
import {
	CommonModule,
	isPlatformServer,
	registerLocaleData
} from '@angular/common'
import localeRu from '@angular/common/locales/ru'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ToastModule} from 'primeng/toast'
import {HttpErrorInterceptor} from './shared/services/error.interceptor'
import {MessageService} from 'primeng/api'
import {CookieModule} from 'ngx-cookie'
import {NotFoundComponent} from './client/shared/not-found/not-found.component'
import {MibUiModule} from './shared/modules/mib-ui/mib-ui.module'
import {appInitializer} from './shared/factories/init.factory'
import {IconsService} from './shared/services/icons.servcie'
import {MatDialogModule} from '@angular/material/dialog'
import {AuthService} from './auth/services/auth.service'
import {RequestsService} from './client/modules/requests/services/requests.service'
import {ToasterModule} from './shared/ui-kit/toaster/toaster.module'
import {AgentClientModule} from './agent-client/agent-client.module'

registerLocaleData(localeRu, 'ru')
const BASE_URL_KEY = makeStateKey<string>('BASE_URL')

@NgModule({
	declarations: [AppComponent, NotFoundComponent],
	imports: [
		BrowserModule.withServerTransition({appId: 'serverApp'}),
		HttpClientModule,
		BrowserAnimationsModule,
		ToastModule,
		AppRoutingModule,
		MibUiModule,
		CookieModule.forRoot(),
		ClientModule,
		AuthModule,
		MatDialogModule,
		ToasterModule,
		AgentClientModule
	],
	providers: [
		MessageService,
		RequestsService,
		{provide: LOCALE_ID, useValue: 'ru'},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true
		},
		{
			provide: 'BASE_URL',
			useFactory: (transferState: TransferState, platformId: Object) => {
				if (isPlatformServer(platformId)) {
					return (
						transferState.get<string>(BASE_URL_KEY, 'https://factoring.metallinvestbank.ru/') ||
						'https://factoring.metallinvestbank.ru/'
					)
				} else {
					return window.location.origin
				}
			},
			deps: [TransferState, PLATFORM_ID]
		},
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializer,
			deps: [AuthService, PLATFORM_ID],
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
