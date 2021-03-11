import { DemandActionVerificationPageComponent } from './components/demand-actions/demand-action-verification-page/demand-action-verification-page.component';
import { DemandActionSuretyPageComponent } from './components/demand-actions/demand-action-surety-page/demand-action-surety-page.component';
import { DemandActionRequestSupportPageComponent } from './components/demand-actions/demand-action-request-support-page/demand-action-request-support-page.component';
import { DemandActionRequestFreePageComponent } from './components/demand-actions/demand-action-request-free-page/demand-action-request-free-page.component';
import { DemandActionDebitorPageComponent } from './components/demand-actions/demand-action-debitor-page/demand-action-debitor-page.component';
import { DemandPageComponent } from './components/demand-page/demand-page.component';
import { GetDemandsEffect } from './store/effects/getDemands.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DemandService } from './services/demand.service';
import { DemandRoutingModule } from './demand-routing.module';
import { DemandHistoryPageComponent } from './components/demand-history-page/demand-history-page.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { SkeletonModule } from 'primeng/skeleton';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { reducers } from './store/reducers';
import { DemandActionEditProfilePageComponent } from './components/demand-actions/demand-action-edit-profile-page/demand-action-edit-profile-page.component';
import { DemandActionEDSPageComponent } from './components/demand-actions/demand-action-eds-page/demand-action-eds-page.component';
import { DemandActionLimitPageComponent } from './components/demand-actions/demand-action-limit-page/demand-action-limit-page.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    FileUploadModule,
    RadioButtonModule,
    InputTextareaModule,
    SliderModule,
    TableModule,
    SkeletonModule,
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
  declarations: [
    DemandPageComponent,
    DemandHistoryPageComponent,
    DemandActionDebitorPageComponent,
    DemandActionEditProfilePageComponent,
    DemandActionEDSPageComponent,
    DemandActionLimitPageComponent,
    DemandActionRequestFreePageComponent,
    DemandActionRequestSupportPageComponent,
    DemandActionSuretyPageComponent,
    DemandActionVerificationPageComponent,
  ],
  providers: [DemandService],
})
export class DemandModule {}
