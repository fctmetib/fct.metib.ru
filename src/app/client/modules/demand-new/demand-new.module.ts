import { DebitorComponent } from './components/debitor/debitor.component'
import { VerifyComponent } from './components/verify/verify.component'
import { DialogModule } from 'primeng/dialog'
import { DemandNewRoutingModule } from './demand-new-routing.module'
import { CommonModule, CurrencyPipe } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'src/app/shared/ui-kit/button/button.module'
import { ButtonModule as ButtonModule22 } from 'primeng/button'
import { TableModule as TableModule22 } from 'primeng/table'
import { MultiSelectModule } from 'primeng/multiselect'
import { ProgressBarModule } from 'primeng/progressbar'
import { SliderModule } from 'primeng/slider'
import { TabViewModule } from 'primeng/tabview'
import { SkeletonModule as SkeletonModule22 } from 'primeng/skeleton'
import { ToastModule } from 'primeng/toast'
import { StepsModule } from 'primeng/steps'
import { InputNumberModule } from 'primeng/inputnumber'

import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { CheckboxModule } from 'primeng/checkbox'
import { RadioButtonModule } from 'primeng/radiobutton'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MenubarModule } from 'primeng/menubar'
import { AvatarModule as AvatarModule22 } from 'primeng/avatar'
import { FileUploadModule } from 'primeng/fileupload'
import { InputMaskModule } from 'primeng/inputmask'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { MessageService } from 'primeng/api'
import { DialogService } from 'primeng/dynamicdialog'
import { AutoCompleteModule } from 'primeng/autocomplete'

// Containers
import { DemandActionComponent } from './containers/demand-action/demand-action.component'
import { DemandCreateComponent } from './containers/demand-create/demand-create.component'
import { DemandActionsComponent } from './containers/demand-actions/demand-actions.component'

import { DemandAddressGroupComponent } from './components/common/address-group/address-group.component'

import { DemandHistoryComponent } from './containers/demand-history/demand-history.component'
import { DemandEditDraftComponent } from './containers/demand-edit-draft/demand-edit-draft.component'
import { DemandViewComponent } from './containers/demand-view/demand-view.component'
import { DemandEditCreatedComponent } from './containers/demand-edit-created/demand-edit-created.component'
import { DemandFilesComponent } from './components/common/demand-files/demand-files.component'

// Components
import { EDSComponent } from './components/eds/eds.component'
import { FactoringComponent } from './components/factoring/factoring.component'

// Services
import { DemandNavigationService } from './services/demand-navigation.service'
import { DemandLoadingService } from './services/demand-loading.service'
import { DemandService } from './services/demand.service'
import { DemandResultComponent } from './components/common/demand-result/demand-result.component'
import { DemandInfoComponent } from './components/common/demand-info/demand-info.component'
import { AddressModalComponent } from './components/common/address/address.component'
import { AgentFactoringComponent } from './components/agent-factoring/agent-factoring.component'
import { SuretyComponent } from './components/surety/surety.component'
import { ProfileComponent } from './components/profile/profile.component'
import { FreeComponent } from './components/free/free.component'
import { LimitComponent } from './components/limit/limit.component'
import { SpacingModule } from 'src/app/shared/ui-kit/spacing/spacing.module'
import { SharedModule } from '../../../shared/shared.module'
import { RequestCardModule } from '../../../shared/modules/request-card/request-card.module'
import { ExitGuard } from '../../../shared/services/exit.guard'
import { CommonService } from '../../../shared/services/common/common.service'
import { FileService } from '../../../shared/services/common/file.service'
import { DeliveryService } from '../../../shared/services/share/delivery.service'
import { SuccessMessagesModule } from '../../../shared/modules/old-modules/successMessages/successMessages.module'
import { BackendErrorMessagesModule } from '../../../shared/modules/old-modules/backendErrorMessages/backendErrorMessages.module'
import { DemandNewHomeComponent } from './pages/demand-new-home/demand-new-home.component'
import { TabModule } from 'src/app/shared/ui-kit/tab/tab.module'
import { NavbarModule } from 'src/app/shared/ui-kit/navbar/navbar.module'
import { InputModule } from 'src/app/shared/ui-kit/input/input.module'
import { RefIconModule } from 'src/app/shared/ui-kit/ref-icon/ref-icon.module'
import { SelectModule } from 'src/app/shared/ui-kit/select/select.module'
import { DropdownPointModule } from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import { TableModule } from 'src/app/shared/ui-kit/table/table.module'
import { PaginatorModule } from 'src/app/shared/ui-kit/paginator/paginator.module'
import { SkeletonModule } from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import { BadgeModule } from 'src/app/shared/ui-kit/badge/badge.module'
import { LeftIconModule } from '../../../shared/directives/left-icon/left-icon.module'
import { AvatarModule } from 'src/app/shared/ui-kit/avatar/avatar.module'
import { DemandDrawerModule } from './modules/demand-drawer/demand-drawer.module'

@NgModule({
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule22,
		FileUploadModule,
		ProgressSpinnerModule,
		RadioButtonModule,
		ToastModule,
		InputTextareaModule,
		InputNumberModule,
		TabViewModule,
		AutoCompleteModule,
		SliderModule,
		TableModule22,
		StepsModule,
		SkeletonModule22,
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
		AvatarModule22,
		SharedModule,
		SpacingModule,
		RequestCardModule,
		TabModule,
		NavbarModule,
		ButtonModule,
		InputModule,
		RefIconModule,
		SelectModule,
		DropdownPointModule,
		PaginatorModule,
		BadgeModule,
		LeftIconModule,
		TableModule,
		SkeletonModule,
		AvatarModule,
		DemandDrawerModule
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
		DemandNewHomeComponent
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
		DeliveryService
	]
})
export class DemandNewModule {}
