import {DeliveryService} from '../../../shared/services/share/delivery.service'
import {CommonModule} from '@angular/common'
import {DropdownModule as DropdownModule22} from 'primeng/dropdown'
import {CardModule} from 'primeng/card'
import {ButtonModule} from 'primeng/button'
import {TableModule} from 'primeng/table'
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
import {ContractsPageComponent} from './components/contracts-page/contracts-page.component'
import {ToolbarModule} from 'primeng/toolbar'
import {TieredMenuModule} from 'primeng/tieredmenu'
import {TooltipModule} from 'primeng/tooltip'
import {PaginatorModule} from 'primeng/paginator'
import {SkeletonModule} from 'primeng/skeleton'
import {DialogModule} from 'primeng/dialog'
import {RequestsService} from '../requests/services/requests.service'
import {ClipboardModule} from 'ngx-clipboard'
import {AccountsService} from 'src/app/shared/services/common/accounts.service'
import {NewContractsPageComponent} from './pages/new-contracts-page/new-contracts-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'

@NgModule({
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule,
		RadioButtonModule,
		InputTextareaModule,
		SliderModule,
		DialogModule,
		TableModule,
		SkeletonModule,
		DropdownModule22,
		PaginatorModule,
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
		NavbarModule
	],
	declarations: [ContractsPageComponent, NewContractsPageComponent],
	providers: [DeliveryService, RequestsService, AccountsService]
})
export class ContractsModule {}
