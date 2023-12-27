import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {InputTextModule} from 'primeng/inputtext'
import {CheckboxModule} from 'primeng/checkbox'
import {RadioButtonModule} from 'primeng/radiobutton'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {MenubarModule} from 'primeng/menubar'
import {AvatarModule} from 'primeng/avatar'
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog'
import {ToolbarModule} from 'primeng/toolbar'
import {DialogModule} from 'primeng/dialog'
import {TieredMenuModule} from 'primeng/tieredmenu'
import {FileUploadModule} from 'primeng/fileupload'
import {DutyService} from 'src/app/shared/services/share/duty.service'
import {FreeDutyPageComponent} from './pages/free-duty-page/free-duty-page.component'
import {TooltipModule} from 'primeng/tooltip'
import {SpacingModule} from '../../../shared/ui-kit/spacing/spacing.module'
import {TabModule} from '../../../shared/ui-kit/tab/tab.module'
import {NavbarModule} from '../../../shared/ui-kit/navbar/navbar.module'
import {InputModule} from '../../../shared/ui-kit/input/input.module'
import {ButtonModule} from '../../../shared/ui-kit/button/button.module'
import {CommonModule} from '@angular/common'
import {FreeDutyRoutingModule} from './free-duty-routing.module'
import {DeliveryService} from '../../../shared/services/share/delivery.service'
import {TableModule} from '../../../shared/ui-kit/table/table.module'
import {RefIconModule} from '../../../shared/ui-kit/ref-icon/ref-icon.module'
import {FreeDutyRequestDrawerModule} from './modules/free-duty-request-drawer/free-duty-request-drawer.module'
import {PaginatorModule} from '../../../shared/ui-kit/paginator/paginator.module'
import {RubModule} from '../../../shared/pipes/rub/rub.module'
import {FreeDutyService} from './services/free-duty.service'
import {SkeletonModule} from '../../../shared/ui-kit/skeleton/skeleton.module'
import {SelectModule} from '../../../shared/ui-kit/select/select.module'
import {DropdownPointModule} from '../../../shared/ui-kit/dropdown-point/dropdown-point.module'
import {AutoCompleteModule} from '../../../shared/ui-kit/auto-complete/auto-complete.module'

@NgModule({
	declarations: [FreeDutyPageComponent],
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule,
		RadioButtonModule,
		TieredMenuModule,
		DynamicDialogModule,
		InputTextareaModule,
		DialogModule,
		FileUploadModule,
		FormsModule,
		TooltipModule,
		ToolbarModule,
		FreeDutyRoutingModule,
		ReactiveFormsModule,
		MenubarModule,
		AvatarModule,
		SpacingModule,
		TabModule,
		NavbarModule,
		InputModule,
		ButtonModule,
		TableModule,
		RefIconModule,
		FreeDutyRequestDrawerModule,
		PaginatorModule,
		RubModule,
		SkeletonModule,
		SelectModule,
		DropdownPointModule,
		AutoCompleteModule
	],
	providers: [DialogService, DeliveryService, DutyService, FreeDutyService]
})
export class FreeDutyModule {}
