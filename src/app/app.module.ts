import { ClientModule } from './client/client.module';

import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { HttpErrorInterceptor } from './shared/services/error.interceptor';
import { MessageService } from 'primeng/api';
import { CookieModule } from 'ngx-cookie';
import { NotFoundComponent } from './client/shared/not-found/not-found.component';

registerLocaleData(localeRu, 'ru');
@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    ClientModule,
    AuthModule
  ],
  providers: [
    MessageService,
    { provide: LOCALE_ID, useValue: 'ru' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
