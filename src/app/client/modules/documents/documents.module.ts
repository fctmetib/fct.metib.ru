import {DocumentsService} from './services/documents.service'
import {DocumentsRoutingModule} from './documents-routing.module'
import {CommonModule, DatePipe} from '@angular/common'
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
import {DocumentsPageComponent} from './components/documents-page/documents-page.component'
import {ToastModule} from 'primeng/toast'
import {TabViewModule} from 'primeng/tabview'
import {TieredMenuModule} from 'primeng/tieredmenu'
import {DynamicDialogModule} from 'primeng/dynamicdialog'
import {DialogModule} from 'primeng/dialog'
import {CalendarModule} from 'primeng/calendar'
import {AccordionModule} from 'primeng/accordion'
import {FileUploadModule} from 'primeng/fileupload'
import {SkeletonModule as SkeletonModule22} from 'primeng/skeleton'
import {ToolbarModule} from 'primeng/toolbar'
import {TooltipModule} from 'primeng/tooltip'
import {RequestsRoutingModule} from '../requests/requests-routing.module'
import {NewDocumentsPageComponent} from './pages/new-documents-page/new-documents-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DatesService} from 'src/app/shared/services/dates.service'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'

@NgModule({
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule22,
		RadioButtonModule,
		InputTextareaModule,
		SliderModule,
		TableModule22,
		DropdownModule22,
		FormsModule,
		ProgressBarModule,
		MultiSelectModule,
		ReactiveFormsModule,
		CardModule,
		MenubarModule,
		AvatarModule,
		DocumentsRoutingModule,
		ToastModule,
		TabViewModule,
		TieredMenuModule,
		DynamicDialogModule,
		DialogModule,
		CalendarModule,
		FileUploadModule,
		SkeletonModule22,
		AccordionModule,
		TooltipModule,
		ToolbarModule,
		RequestsRoutingModule,
		SpacingModule,
		TabModule,
		InputModule,
		IconModule,
		PaginatorModule,
		SkeletonModule,
		TableModule,
		ButtonModule,
		DropdownPointModule,
		SelectModule,
		DropdownModule
	],
	declarations: [DocumentsPageComponent, NewDocumentsPageComponent],
	providers: [DocumentsService, DatesService, DatePipe]
})
export class DocumentsModule {}
