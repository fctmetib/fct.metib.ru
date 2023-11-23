import {DebitorComponent} from './components/debitor/debitor.component';
import {VerifyComponent} from './components/verify/verify.component';
import {BackendErrorMessagesModule} from '../backendErrorMessages/backendErrorMessages.module';
import {DialogModule} from 'primeng/dialog';
import {SuccessMessagesModule} from '../successMessages/successMessages.module';
import {DemandNewRoutingModule} from './demand-new-routing.module';
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
import {FileUploadModule} from 'primeng/fileupload';
import {CommonService} from '../../services/common/common.service';
import {FileService} from '../../services/common/file.service';
import {InputMaskModule} from 'primeng/inputmask';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {ExitGuard} from '../../services/exit.guard';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SharedModule} from '../../shared.module';

// Containers
import {DemandActionComponent} from './containers/demand-action/demand-action.component';
import {DemandCreateComponent} from './containers/demand-create/demand-create.component';
import {DemandActionsComponent} from './containers/demand-actions/demand-actions.component';

import {DemandAddressGroupComponent} from './components/common/address-group/address-group.component';

import {DemandHistoryComponent} from './containers/demand-history/demand-history.component';
import {DemandEditDraftComponent} from './containers/demand-edit-draft/demand-edit-draft.component';
import {DemandViewComponent} from './containers/demand-view/demand-view.component';
import {DemandEditCreatedComponent} from './containers/demand-edit-created/demand-edit-created.component';
import {DemandFilesComponent} from './components/common/demand-files/demand-files.component';

// Components
import {EDSComponent} from './components/eds/eds.component';
import {FactoringComponent} from './components/factoring/factoring.component';

// Services
import {DemandNavigationService} from './services/demand-navigation.service';
import {DemandLoadingService} from './services/demand-loading.service';
import {DemandService} from './services/demand.service';
import {DemandResultComponent} from './components/common/demand-result/demand-result.component';
import {DemandInfoComponent} from './components/common/demand-info/demand-info.component';
import {AddressModalComponent} from './components/common/address/address.component';
import {AgentFactoringComponent} from './components/agent-factoring/agent-factoring.component';
import {SuretyComponent} from './components/surety/surety.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FreeComponent} from './components/free/free.component';
import {LimitComponent} from './components/limit/limit.component';
import {DeliveryService} from '../../services/share/delivery.service';

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
    ProgressBarModule,
    MultiSelectModule,
    DemandNewRoutingModule,
    InputMaskModule,
    ReactiveFormsModule,
    SuccessMessagesModule,
    BackendErrorMessagesModule,
    CardModule,
    DialogModule,
    MenubarModule,
    AvatarModule,
    SharedModule,
  ],
  declarations: [
    // Containers
    DemandActionComponent,
    DemandCreateComponent,
    DemandEditDraftComponent,
    DemandEditCreatedComponent,
    DemandViewComponent,
    DemandActionsComponent,
    DemandHistoryComponent,
    // Shared Components
    DemandResultComponent,
    DemandInfoComponent,
    DemandFilesComponent,
    // Components
    EDSComponent,
    FactoringComponent,
    SuretyComponent,
    AgentFactoringComponent,
    ProfileComponent,
    DemandAddressGroupComponent,
    FreeComponent,
    LimitComponent,
    VerifyComponent,
    DebitorComponent,
    // Modals
    AddressModalComponent,
  ],
  providers: [
    ExitGuard,
    DialogService,
    CurrencyPipe,
    MessageService,
    CommonService,
    FileService,
    // Demand Services
    DemandNavigationService,
    DemandService,
    DemandLoadingService,
    DeliveryService,
  ],
})
export class DemandNewModule {
}
