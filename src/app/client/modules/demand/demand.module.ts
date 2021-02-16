import { GetDemandsEffect } from './store/effects/getDemands.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DemandService } from './services/demand.service';
import { DemandRoutingModule } from './demand-routing.module';
import { DemandPageComponent } from './components/demand-history-page/demand-history-page.component';
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
import { reducers } from './store/reducers';

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
    EffectsModule.forFeature([GetDemandsEffect]),
    StoreModule.forFeature('demands', reducers),
    ProgressBarModule,
    MultiSelectModule,
    DemandRoutingModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    AvatarModule,
  ],
  declarations: [DemandPageComponent],
  providers: [DemandService],
})
export class DemandModule {}
