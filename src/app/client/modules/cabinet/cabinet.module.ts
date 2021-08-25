import { OrganizationService } from './../../../shared/services/share/organization.service';
import { DeliveryService } from './../../../shared/services/share/delivery.service';
import { FactoringComponent } from './components/cabinet-page/factoring/factoring.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetPageComponent } from './components/cabinet-page/cabinet-page.component';
import { ClientService } from 'src/app/shared/services/common/client.service';
import { SkeletonModule } from 'primeng/skeleton';
import { StatisticsService } from './services/statistics.service';

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
    SkeletonModule,
    ProgressBarModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CardModule,
    MenubarModule,
    AvatarModule,
    CabinetRoutingModule,
  ],
  declarations: [CabinetPageComponent, FactoringComponent],
  providers: [ClientService, DeliveryService, OrganizationService, StatisticsService],
})
export class CabinetModule {}
