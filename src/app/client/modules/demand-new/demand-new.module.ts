import {DialogModule} from 'primeng/dialog'
import {DemandNewRoutingModule} from './demand-new-routing.module'
import {CommonModule, CurrencyPipe} from '@angular/common'
import {DropdownModule as DropdownModule22} from 'primeng/dropdown'
import {CardModule} from 'primeng/card'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {ButtonModule as ButtonModule22} from 'primeng/button'
import {TableModule as TableModule22} from 'primeng/table'
import {MultiSelectModule} from 'primeng/multiselect'
import {ProgressBarModule} from 'primeng/progressbar'
import {SliderModule} from 'primeng/slider'
import {TabViewModule} from 'primeng/tabview'
import {SkeletonModule as SkeletonModule22} from 'primeng/skeleton'
import {ToastModule} from 'primeng/toast'
import {StepsModule} from 'primeng/steps'
import {InputNumberModule} from 'primeng/inputnumber'

import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {InputTextModule} from 'primeng/inputtext'
import {CheckboxModule} from 'primeng/checkbox'
import {RadioButtonModule} from 'primeng/radiobutton'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {MenubarModule} from 'primeng/menubar'
import {AvatarModule as AvatarModule22} from 'primeng/avatar'
import {FileUploadModule} from 'primeng/fileupload'
import {InputMaskModule} from 'primeng/inputmask'
import {ProgressSpinnerModule} from 'primeng/progressspinner'
import {MessageService} from 'primeng/api'
import {DialogService} from 'primeng/dynamicdialog'
import {AutoCompleteModule} from 'primeng/autocomplete'

// Services
import {DemandNavigationService} from './services/demand-navigation.service'
import {DemandLoadingService} from './services/demand-loading.service'
import {DemandService} from './services/demand.service'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {SharedModule} from '../../../shared/shared.module'
import {RequestCardModule} from '../../../shared/modules/request-card/request-card.module'
import {ExitGuard} from '../../../shared/services/exit.guard'
import {CommonService} from '../../../shared/services/common/common.service'
import {FileService} from '../../../shared/services/common/file.service'
import {DeliveryService} from '../../../shared/services/share/delivery.service'
import {SuccessMessagesModule} from '../../../shared/modules/old-modules/successMessages/successMessages.module'
import {BackendErrorMessagesModule} from '../../../shared/modules/old-modules/backendErrorMessages/backendErrorMessages.module'
import {DemandNewHomeComponent} from './pages/demand-new-home/demand-new-home.component'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {BadgeModule} from 'src/app/shared/ui-kit/badge/badge.module'
import {LeftIconModule} from '../../../shared/directives/left-icon/left-icon.module'
import {AvatarModule} from 'src/app/shared/ui-kit/avatar/avatar.module'
import {DemandDrawerModule} from './modules/demand-drawer/demand-drawer.module'
import {LabelModule} from '../../../shared/directives/label/label.module'
import {DemandSignatureDrawerModule} from './modules/demand-signature-drawer/demand-signature-drawer.module'
import {DemandSuretyDrawerModule} from './modules/demand-surety-drawer/demand-surety-drawer.module'
import {DemandEditingDrawerModule} from './modules/demand-editing-drawer/demand-editing-drawer.module'
import {DemandLimitDrawerModule} from './modules/demand-limit-drawer/demand-limit-drawer.module'
import {DemandDebtorDrawerModule} from './modules/demand-debtor-drawer/demand-debtor-drawer.module'
import {DemandVerificationDrawerModule} from './modules/demand-verification-drawer/demand-verification-drawer.module'
import {DemandFactoringDrawerModule} from './modules/demand-factoring-drawer/demand-factoring-drawer.module'
import {DemandAgentDrawerModule} from './modules/demand-agent-drawer/demand-agent-drawer.module'
import {RequestDrawerModule} from '../not-verify/modules/verify-request-drawer/request-drawer.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {DemandPageHistoryModalModule} from 'src/app/shared/modules/modals/demand-page-history-modal/demand-page-history-modal.module'

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
		DropdownModule22,
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
		IconModule,
		SelectModule,
		DropdownPointModule,
		PaginatorModule,
		BadgeModule,
		LeftIconModule,
		TableModule,
		SkeletonModule,
		AvatarModule,
		DemandDrawerModule,
		LabelModule,
		DemandSignatureDrawerModule,
		DemandSuretyDrawerModule,
		DemandEditingDrawerModule,
		DemandLimitDrawerModule,
		DemandDebtorDrawerModule,
		DemandVerificationDrawerModule,
		DemandFactoringDrawerModule,
		DemandAgentDrawerModule,
		RequestDrawerModule,
		DemandPageHistoryModalModule
	],
	declarations: [
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
