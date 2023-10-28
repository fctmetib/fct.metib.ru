import {SuretyDataComponent} from './containers/demand-actions/demand-action-surety-page/components/surety-data/surety-data.component';
import {BackendErrorMessagesModule} from '../backendErrorMessages/backendErrorMessages.module';
import {DialogModule} from 'primeng/dialog';
import {SuccessMessagesModule} from '../successMessages/successMessages.module';
import {GetDemandsEffect} from './store/effects/getDemands.effect';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {DemandService} from './services/demand.service';
import {DemandRoutingModule} from './demand-routing.module';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {ProgressBarModule} from 'primeng/progressbar';
import {SliderModule} from 'primeng/slider';
import {TabViewModule} from 'primeng/tabview';
import {SkeletonModule} from 'primeng/skeleton';
import {ToastModule} from 'primeng/toast';
import {StepsModule} from 'primeng/steps';
import {InputNumberModule} from 'primeng/inputnumber';

import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';
import {reducers} from './store/reducers';
import {FileUploadModule} from 'primeng/fileupload';
import {CommonService} from '../../services/common/common.service';
import {FileService} from '../../services/common/file.service';
import {CreateDemandFactoringEffect} from './store/effects/createDemand.effect';
import {InputMaskModule} from 'primeng/inputmask';
import {RemoveDemandsEffect} from './store/effects/removeDemands.effect';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {GetDraftsEffect} from './store/effects/getDrafts.effect';

import {MessageService} from 'primeng/api';
import {DemandPageComponent} from './containers/demand-page/demand-page.component';
import {DemandHistoryPageComponent} from './containers/demand-history-page/demand-history-page.component';
import {
  DemandActionDebitorPageComponent
} from './containers/demand-actions/demand-action-debitor-page/demand-action-debitor-page.component';
import {
  DemandActionEditProfilePageComponent
} from './containers/demand-actions/demand-action-edit-profile-page/demand-action-edit-profile-page.component';
import {DemandActionEDSPageComponent} from './containers/demand-actions/demand-action-eds-page/demand-action-eds-page.component';
import {DemandActionLimitPageComponent} from './containers/demand-actions/demand-action-limit-page/demand-action-limit-page.component';
import {
  DemandActionRequestFreePageComponent
} from './containers/demand-actions/demand-action-request-free-page/demand-action-request-free-page.component';
import {
  DemandActionRequestSupportPageComponent
} from './containers/demand-actions/demand-action-request-support-page/demand-action-request-support-page.component';
import {
  DemandActionAgentFactoringPageComponent
} from './containers/demand-actions/demand-action-agent-factoring-page/demand-action-agent-factoring-page.component';
import {
  DemandActionFactoringPageComponent
} from './containers/demand-actions/demand-action-factoring-page/demand-action-factoring-page.component';
import {DemandActionSuretyPageComponent} from './containers/demand-actions/demand-action-surety-page/demand-action-surety-page.component';
import {
  DemandActionVerificationPageComponent
} from './containers/demand-actions/demand-action-verification-page/demand-action-verification-page.component';
import {DebitorDataComponent} from './containers/demand-actions/demand-action-debitor-page/components/debitor-data/debitor-data.component';
import {
  FactoringDataComponent
} from './containers/demand-actions/demand-action-factoring-page/components/factoring-data/factoring-data.component';
import {DemandFilesComponent} from './shared/components/demand-files/demand-files.component';
import {DemandInfoComponent} from './shared/components/demand-info/demand-info.component';
import {AddressModalComponent} from './components/address/address.component';
import {DialogService} from 'primeng/dynamicdialog';
import {ExitGuard} from '../../services/exit.guard';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DemandResultComponent} from './shared/components/demand-result/demand-result.component';
import {SharedModule} from '../../shared.module';

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
    InputNumberModule,
    TabViewModule,
    AutoCompleteModule,
    SliderModule,
    TableModule,
    StepsModule,
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
    SharedModule
  ],
  declarations: [
    // Containers
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
    // Components
    DebitorDataComponent,
    SuretyDataComponent,
    FactoringDataComponent,
    DemandFilesComponent,
    DemandResultComponent,
    DemandInfoComponent,
    // Modals
    AddressModalComponent
  ],
  providers: [
    ExitGuard,
    DialogService,
    CurrencyPipe,
    DemandService,
    MessageService,
    CommonService,
    FileService,
  ],
})
export class DemandModule {
}
