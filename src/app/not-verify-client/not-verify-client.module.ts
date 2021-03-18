import { NotVerifyClientLayoutComponent } from './../shared/layouts/not-verify-client-layout/not-verify-client-layout.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NotVerifyClientRoutingModule } from './not-verify-client-routing.module';
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
import { HeaderComponent } from '../shared/layouts/not-verify-client-layout/header/header.component';
import { MobileHeaderComponent } from '../shared/layouts/not-verify-client-layout/mobile-header/mobile-header.component';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    DropdownModule,
    MenuModule,
    SkeletonModule,
    FormsModule,
    NotVerifyClientRoutingModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
  ],
  declarations: [NotVerifyClientLayoutComponent, HeaderComponent, MobileHeaderComponent],
  providers: [],
})
export class NotVerifyClientModule {}
