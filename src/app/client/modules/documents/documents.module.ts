import { DocumentsService } from './services/documents.service';
import { DocumentsRoutingModule } from './documents-routing.module';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { DocumentsPageComponent } from './components/documents-page/documents-page.component';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { SkeletonModule } from 'primeng/skeleton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module';
import { SuccessMessagesModule } from 'src/app/shared/modules/successMessages/successMessages.module';
import { RequestsRoutingModule } from '../requests/requests-routing.module';
import { ViewFileDialogModule } from 'src/app/shared/modules/view-file-dialog/view-file-dialog.module';

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
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
    DocumentsRoutingModule,
    ToastModule,
    TabViewModule,
    TieredMenuModule,
    DynamicDialogModule,
    DialogModule,
    CalendarModule,
    FileUploadModule,
    SkeletonModule,
    AccordionModule,
    TooltipModule,
    ToolbarModule,
    BackendErrorMessagesModule,
    SuccessMessagesModule,
    RequestsRoutingModule,
    ViewFileDialogModule
  ],
  declarations: [DocumentsPageComponent],
  providers: [DocumentsService],
})
export class DocumentsModule {}
