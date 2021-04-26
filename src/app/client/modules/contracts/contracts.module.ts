import { DeliveryService } from './../../../shared/services/share/delivery.service';
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
import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsPageComponent } from './components/contracts-page/contracts-page.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import {TooltipModule} from 'primeng/tooltip';
import {PaginatorModule} from 'primeng/paginator';
import {SkeletonModule} from 'primeng/skeleton';
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
    SkeletonModule,
    DropdownModule,
    PaginatorModule,
    ToolbarModule,
    TooltipModule,
    TieredMenuModule,
    FormsModule,
    ProgressBarModule,
    MultiSelectModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
    ContractsRoutingModule,
  ],
  declarations: [ContractsPageComponent],
  providers: [DeliveryService],
})
export class ContractsModule {}
