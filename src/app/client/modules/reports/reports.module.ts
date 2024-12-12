import { ReportService } from '../../../shared/services/common/report.service';
import { ReportsRoutingModule } from './reports-routing.module';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
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
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { ReportViewPageComponent } from './components/report-view-page/report-view-page.component';
import { ReportInitDialogComponent } from './components/report-init-dialog/report-init-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DeliveryService } from 'src/app/shared/services/share/delivery.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReportCardComponent } from './components/reports-page/components/report-card/report-card.component';
import { SpacingModule } from '../../../shared/ui-kit/spacing/spacing.module';
import {
  ReportAggregateDrawerComponent
} from './components/drawers/report-agregate-drawer/report-aggregate-drawer.component';
import { TableModule } from '../../../shared/ui-kit/table/table.module';
import { PaginatorModule } from '../../../shared/ui-kit/paginator/paginator.module';

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
		ReportCardComponent,
		SpacingModule,
		ReportAggregateDrawerComponent,
		TableModule,
		PaginatorModule
	],
  declarations: [
    ReportsPageComponent,
    ReportViewPageComponent,
    ReportInitDialogComponent
  ],
  providers: [ReportService, DialogService, DeliveryService, MessageService]
})
export class ReportsModule {
}
