import { BackendErrorMessagesModule } from './../backendErrorMessages/backendErrorMessages.module';
import { DialogModule } from 'primeng/dialog';
import { SuccessMessagesModule } from './../successMessages/successMessages.module';
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
import { CommonModule, CurrencyPipe } from '@angular/common';
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
import { DemandActionAgentFactoringPageComponent } from './components/demand-actions/demand-action-agent-factoring-page/demand-action-agent-factoring-page.component';
import { DemandActionFactoringPageComponent } from './components/demand-actions/demand-action-factoring-page/demand-action-factoring-page.component';
import { CommonService } from '../../services/common/common.service';
import { FileService } from '../../services/common/file.service';
import { CreateDemandFactoringEffect } from './store/effects/createDemand.effect';
import { InputMaskModule } from 'primeng/inputmask';
import { RemoveDemandsEffect } from './store/effects/removeDemands.effect';
import { CryptoProService } from '../../services/common/cryprto-pro.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GetDraftsEffect } from './store/effects/getDrafts.effect';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';
@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    ToastModule,
    InputTextareaModule,
    TabViewModule,
    SliderModule,
    TableModule,
    SkeletonModule,
    DropdownModule,
    FormsModule,
    EffectsModule.forFeature([
      GetDemandsEffect,
      GetDraftsEffect,
      CreateDemandFactoringEffect,
      RemoveDemandsEffect,
    ]),
    StoreModule.forFeature('demands', reducers),
    ProgressBarModule,
    MultiSelectModule,
    DemandRoutingModule,
    InputMaskModule,
    ReactiveFormsModule,
    SuccessMessagesModule,
    BackendErrorMessagesModule,
    CardModule,
    DialogModule,
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
    DemandActionAgentFactoringPageComponent,
    DemandActionFactoringPageComponent,
    DemandActionSuretyPageComponent,
    DemandActionVerificationPageComponent,
  ],
  providers: [
    CurrencyPipe,
    DemandService,
    MessageService,
    CryptoProService,
    CommonService,
    FileService,
  ],
})
export class DemandModule {}
