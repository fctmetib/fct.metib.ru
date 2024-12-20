import {ReportService} from '../../../shared/services/common/report.service';
import {ReportsRoutingModule} from './reports-routing.module';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {ProgressBarModule} from 'primeng/progressbar';
import {SliderModule} from 'primeng/slider';

import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';
import {ReportsPageComponent} from './components/reports-page/reports-page.component';
import {ReportViewPageComponent} from './components/report-view-page/report-view-page.component';
import {ReportInitDialogComponent} from './components/report-init-dialog/report-init-dialog.component';
import {DialogService} from 'primeng/dynamicdialog';
import {DeliveryService} from 'src/app/shared/services/share/delivery.service';
import {SkeletonModule} from 'primeng/skeleton';
import {CalendarModule} from 'primeng/calendar';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    SliderModule,
    ToastModule,
    TooltipModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    SkeletonModule,
    MultiSelectModule,
    ReportsRoutingModule,
    ContextMenuModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
  ],
  declarations: [
    ReportsPageComponent,
    ReportViewPageComponent,
    ReportInitDialogComponent,
  ],
  providers: [ReportService, DialogService, DeliveryService, MessageService],
})
export class ReportsModule {
}
