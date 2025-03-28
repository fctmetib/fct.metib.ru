import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieBackendModule } from 'ngx-cookie-backend';
import { PublicModule } from './public/public.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    CookieBackendModule.withOptions(),
    PublicModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
