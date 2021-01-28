import { CabinetPageComponent } from './cabinet-page/cabinet-page.component';
import { HeaderComponent } from './../shared/layouts/protected-layout/header/header.component';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedLayoutComponent } from './../shared/layouts/protected-layout/protected-layout.component';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';

@NgModule({
  declarations: [
    ProtectedLayoutComponent,
    HeaderComponent,
    CabinetPageComponent
  ],
  imports: [
    InputTextModule,
		CheckboxModule,
		ButtonModule,
		RadioButtonModule,
		InputTextareaModule,
		DropdownModule,
    FormsModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule
  ],
  providers: []
})
export class ProtectedModule { }
