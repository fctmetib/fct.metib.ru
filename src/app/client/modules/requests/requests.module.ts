// import {RequestCorrectDialogComponent} from './components/request-correct-dialog/request-correct-dialog.component'
import {DeliveryService} from 'src/app/shared/services/share/delivery.service'
// import {RequestCreateDialogComponent} from './components/request-create-dialog/request-create-dialog.component'
import {RequestsService} from './services/requests.service'
import {RequestsRoutingModule} from './requests-routing.module'
import {CommonModule, DatePipe} from '@angular/common'
import {CardModule} from 'primeng/card'
import {MultiSelectModule} from 'primeng/multiselect'
import {ProgressBarModule} from 'primeng/progressbar'
import {SliderModule} from 'primeng/slider'
import {TabViewModule} from 'primeng/tabview'
import {CalendarModule} from 'primeng/calendar'
import {TooltipModule} from 'primeng/tooltip'
import {AccordionModule} from 'primeng/accordion'

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
import {FileService} from 'src/app/shared/services/common/file.service'
import {CommonService} from 'src/app/shared/services/common/common.service'
import {ToastModule} from 'primeng/toast'
import {MessageService} from 'primeng/api'
import {DocumentViewDialogComponent} from 'src/app/client/shared/components/dialogs/document-view-dialog/document-view-dialog.component'

import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {RequestDrawerModule} from './modules/request-drawer/request-drawer.module'
import {DocumentsViewComponent} from './pages/requests-page/no-touch-this/documents-view/documents-view.componet'
import {ShipmentsViewComponent} from './pages/requests-page/no-touch-this/shipments-view/shipments-view.componet'
import {RequestsPageComponent} from './pages/requests-page/requests-page.component'
import {RequestBrowserDrawerModule} from './modules/request-browser-drawer/request-browser-drawer.module'
import {SignPinModalModule} from '../../../shared/modules/modals/sign-pin-modal/sign-pin-modal.module'
import {DropdownModule} from '../../../shared/ui-kit/dropdown/dropdown.module'
import {DropdownPointModule} from '../../../shared/ui-kit/dropdown-point/dropdown-point.module'
import {DatesService} from '../../../shared/services/dates.service'
import {PasteModalModule} from '../../../shared/modules/modals/paste-modal/paste-modal.module'
import {RequestsPageModalModule} from 'src/app/shared/modules/modals/requests-page-modal/requests-page-modal.module'
import { RubModule } from '../../../shared/pipes/rub/rub.module';
import {
	HeadCellFilterActionsDirective
} from '../../../shared/ui-kit/table/components/table-head-cell/directives/head-cell-filter-action/head-cell-filter-actions.directive';
import {
	TableColumnsSelectComponent
} from '../../../shared/ui-kit/table/components/table-columns-displayer/table-columns-select.component';

@NgModule({
	declarations: [
		//Components
		DocumentsViewComponent,
		ShipmentsViewComponent,
		DocumentViewDialogComponent,
		// Containers
		RequestsPageComponent
		// RequestCreateDialogComponent,
		// RequestCorrectDialogComponent
	],
	imports: [
		CommonModule,
		InputTextModule,
		ToastModule,
		TabViewModule,
		CheckboxModule,
		ButtonModule,
		RadioButtonModule,
		TieredMenuModule,
		DynamicDialogModule,
		InputTextareaModule,
		DialogModule,
		CalendarModule,
		FileUploadModule,
		SkeletonModule,
		SliderModule,
		AccordionModule,
		TableModule,
		TooltipModule,
		FormsModule,
		ProgressBarModule,
		ToolbarModule,
		MultiSelectModule,
		RequestsRoutingModule,
		ReactiveFormsModule,
		CardModule,
		MenubarModule,
		AvatarModule,
		SpacingModule,
		TabModule,
		InputModule,
		IconModule,
		PaginatorModule,
		RequestDrawerModule,
		RequestBrowserDrawerModule,
		SignPinModalModule,
		DropdownModule,
		DropdownPointModule,
		PasteModalModule,
		RequestsPageModalModule,
		RubModule,
		HeadCellFilterActionsDirective,
		TableColumnsSelectComponent
	],
	providers: [
		DialogService,
		DeliveryService,
		RequestsService,
		FileService,
		MessageService,
		CommonService,
		DatesService,
		DatePipe
	]
})
export class RequestsModule {}
