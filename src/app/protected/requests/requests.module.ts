import { RequestsPageComponent } from './components/requests-page/requests-page.component';
import { RequestsRoutingModule } from './requests-routing.module';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {ProgressBarModule} from 'primeng/progressbar';
import {SliderModule} from 'primeng/slider';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
		CheckboxModule,
		ButtonModule,
		RadioButtonModule,
    InputTextareaModule,
    SliderModule,
    TableModule,
		DropdownModule,
    FormsModule,
    ProgressBarModule,
    MultiSelectModule,
    RequestsRoutingModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule
  ],
  declarations: [
    RequestsPageComponent,
  ],
  providers: [
  ]
})
export class RequestModule { }
