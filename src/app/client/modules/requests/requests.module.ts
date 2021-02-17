import { DeliveryService } from './../../../shared/services/share/delivery.service';
import { RequestCreateDialogComponent } from './components/request-create-dialog/request-create-dialog.component';
import { RequestsService } from './services/requests.service';
import { GetRequestsEffect } from './store/effects/getRequests.effect';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RequestsPageComponent } from './components/requests-page/requests-page.component';
import { RequestsRoutingModule } from './requests-routing.module';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { reducers } from './store/reducers';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    TabViewModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    DynamicDialogModule,
    InputTextareaModule,
    SliderModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ProgressBarModule,
    MultiSelectModule,
    EffectsModule.forFeature([GetRequestsEffect]),
    StoreModule.forFeature('requests', reducers),
    RequestsRoutingModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
  ],
  declarations: [RequestsPageComponent, RequestCreateDialogComponent],
  providers: [DialogService, DeliveryService, RequestsService],
})
export class RequestModule {}
