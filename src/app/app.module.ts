import {ClientModule} from './client/client.module'

import {AuthModule} from './auth/auth.module';
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {HttpErrorInterceptor} from './shared/services/error.interceptor';
import {MessageService} from 'primeng/api';
import {CookieModule} from 'ngx-cookie';
import {NotFoundComponent} from './client/shared/not-found/not-found.component';
import {MibUiModule} from './shared/modules/mib-ui/mib-ui.module';
import {appInitializer} from './shared/factories/init.factory';
import {IconsService} from './shared/services/icons.servcie';

registerLocaleData(localeRu, 'ru')

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
  ],
  providers: [
    MessageService,
    {provide: LOCALE_ID, useValue: 'ru'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [IconsService]
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
