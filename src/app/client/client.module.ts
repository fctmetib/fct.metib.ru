import { GetFactoringEffect } from './store/effects/getFactoring.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClientRoutingModule } from './client-routing.module';
import {SkeletonModule} from 'primeng/skeleton';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { ClientService } from '../shared/services/common/client.service';
import { reducers } from './store/reducers';
import { DeliveryService } from '../shared/services/share/delivery.service';
import { OrganizationService } from '../shared/services/share/organization.service';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './shared/header/header.component';
import { MobileHeaderComponent } from './shared/mobile-header/mobile-header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/services/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    HttpClientModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    EffectsModule.forFeature([GetFactoringEffect]),
    StoreModule.forFeature('client', reducers),
    DropdownModule,
    MenuModule,
    SkeletonModule,
    FormsModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
  ],
  declarations: [ClientComponent, HeaderComponent, MobileHeaderComponent],
  providers: [
    ClientService,
    DeliveryService,
    OrganizationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
})
export class ClientModule {}
