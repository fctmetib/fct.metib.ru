import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NotVerifyClientRoutingModule } from './not-verify-client-routing.module';
import { SkeletonModule } from 'primeng/skeleton';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { NotVerifyClientComponent } from './not-verify-client.component';
import { HeaderComponent } from './shared/header/header.component';
import { MobileHeaderComponent } from './shared/mobile-header/mobile-header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/services/auth.interceptor';
import { DialogService } from 'primeng/dynamicdialog';
import { InactiveDialogModule } from '../shared/modules/inactive-dialog/inactive-dialog.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UpdatePasswordDialogModule } from '../shared/modules/update-password-dialog/update-password-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    HttpClientModule,
    RadioButtonModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    DropdownModule,
    MenuModule,
    SkeletonModule,
    FormsModule,
    NotVerifyClientRoutingModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
    InactiveDialogModule,
    UpdatePasswordDialogModule
  ],
  declarations: [
    NotVerifyClientComponent,
    HeaderComponent,
    MobileHeaderComponent,
  ],
  providers: [
    DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class NotVerifyClientModule {}
