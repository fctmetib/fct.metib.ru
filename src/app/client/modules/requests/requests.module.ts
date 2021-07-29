import { RequestCorrectDialogComponent } from './components/request-correct-dialog/request-correct-dialog.component';
import { BackendErrorMessagesModule } from './../../../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { SuccessMessagesModule } from './../../../shared/modules/successMessages/successMessages.module';
import { CRUDEffect } from './store/effects/crud.effect';
import { DeliveryService } from './../../../shared/services/share/delivery.service';
import { RequestCreateDialogComponent } from './components/request-create-dialog/request-create-dialog.component';
import { RequestsService } from './services/requests.service';
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
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';

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
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { FileService } from 'src/app/shared/services/common/file.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AgencyRequestCreateDialogComponent } from './components/agency-request-create-dialog/agency-request-create-dialog.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RequestStoreService } from '../../../shared/services/store/request.store.service';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ToastModule,
    TabViewModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    TieredMenuModule,
    DynamicDialogModule,
    InputTextareaModule,
    DialogModule,
    CalendarModule,
    FileUploadModule,
    SkeletonModule,
    SliderModule,
    AccordionModule,
    TableModule,
    DropdownModule,
    TooltipModule,
    FormsModule,
    ProgressBarModule,
    ToolbarModule,
    MultiSelectModule,
    EffectsModule.forFeature([CRUDEffect]),
    StoreModule.forFeature('requests', reducers),
    BackendErrorMessagesModule,
    SuccessMessagesModule,
    RequestsRoutingModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
  ],
  declarations: [
    RequestsPageComponent,
    RequestCreateDialogComponent,
    RequestCorrectDialogComponent,
    AgencyRequestCreateDialogComponent,
  ],
  providers: [
    DialogService,
    DeliveryService,
    RequestsService,
    FileService,
    MessageService,
    CommonService,
  ],
})
export class RequestModule {}
