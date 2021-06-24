import { FreedutyRoutingModule } from './freeduty-routing.module';
import { BackendErrorMessagesModule } from '../../../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { SuccessMessagesModule } from '../../../shared/modules/successMessages/successMessages.module';
import { DeliveryService } from '../../../shared/services/share/delivery.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { DutyService } from 'src/app/shared/services/share/duty.service';
import { FreedutyPageComponent } from './components/freeduty-page/freeduty-page.component';
import { TooltipModule } from 'primeng/tooltip';
import { FreedutyStoreService } from './services/freeduty.store.service';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    TabViewModule,
    SkeletonModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    TieredMenuModule,
    DynamicDialogModule,
    InputTextareaModule,
    DialogModule,
    FileUploadModule,
    SliderModule,
    TableModule,
    DropdownModule,
    FormsModule,
    TooltipModule,
    ProgressBarModule,
    ToolbarModule,
    MultiSelectModule,
    BackendErrorMessagesModule,
    SuccessMessagesModule,
    FreedutyRoutingModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
  ],
  declarations: [FreedutyPageComponent],
  providers: [
    DialogService,
    DeliveryService,
    FreedutyStoreService,
    DutyService,
  ],
})
export class FreedutyModule {}
