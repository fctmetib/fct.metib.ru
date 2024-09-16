import {DeliveryService} from '../../../shared/services/share/delivery.service'
import {CommonModule} from '@angular/common'
import {DropdownModule as DropdownModule22} from 'primeng/dropdown'
import {CardModule} from 'primeng/card'
import {ButtonModule as ButtonModule22} from 'primeng/button'
import {TableModule as TableModule22} from 'primeng/table'
import {MultiSelectModule} from 'primeng/multiselect'
import {ProgressBarModule} from 'primeng/progressbar'
import {SliderModule} from 'primeng/slider'

import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {InputTextModule} from 'primeng/inputtext'
import {CheckboxModule} from 'primeng/checkbox'
import {RadioButtonModule} from 'primeng/radiobutton'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {MenubarModule} from 'primeng/menubar'
import {AvatarModule} from 'primeng/avatar'
import {ContractsRoutingModule} from './contracts-routing.module'
import {ToolbarModule} from 'primeng/toolbar'
import {TieredMenuModule} from 'primeng/tieredmenu'
import {TooltipModule} from 'primeng/tooltip'
import {PaginatorModule as PaginatorModule22} from 'primeng/paginator'
import {SkeletonModule as SkeletonModule22} from 'primeng/skeleton'
import {DialogModule} from 'primeng/dialog'
import {RequestsService} from '../requests/services/requests.service'
import {ClipboardModule} from '@angular/cdk/clipboard'
// import {ClipboardModule} from 'ngx-clipboard'
import {AccountsService} from 'src/app/shared/services/common/accounts.service'
import {ContractsPageComponent} from './pages/contracts-page/contracts-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {NewContractsPageDrawerModule} from './modules/new-contracts-page-drawer/new-contracts-page-drawer.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'
import {BadgeModule} from 'src/app/shared/ui-kit/badge/badge.module'
import {DatesService} from 'src/app/shared/services/dates.service'
import {ContractsFactoringModalModule} from 'src/app/shared/modules/modals/contracts-factoring-modal/contracts-factoring-modal.module'

@NgModule({
	declarations: [ContractsPageComponent, ContractsPageComponent],
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule22,
		RadioButtonModule,
		InputTextareaModule,
		SliderModule,
		DialogModule,
		TableModule22,
		SkeletonModule22,
		DropdownModule22,
		PaginatorModule22,
		ToolbarModule,
		TooltipModule,
		TieredMenuModule,
		ClipboardModule,
		FormsModule,
		ProgressBarModule,
		MultiSelectModule,
		ReactiveFormsModule,
		CardModule,
		MenubarModule,
		AvatarModule,
		ContractsRoutingModule,
		SpacingModule,
		TabModule,
		DropdownModule,
		DropdownPointModule,
		NavbarModule,
		SelectModule,
		IconModule,
		PaginatorModule,
		SkeletonModule,
		TableModule,
		ButtonModule,
		NewContractsPageDrawerModule,
		RubModule,
		BadgeModule,
		ContractsFactoringModalModule
	],
	providers: [DeliveryService, RequestsService, AccountsService, DatesService]
})
export class ContractsModule {}
