import {DelaysRoutingModule} from './delays-routing.module'
import {CommonModule} from '@angular/common'
import {DropdownModule} from 'primeng/dropdown'
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
import {DelaysPageComponent} from './delays-page/delays-page.component'
import {DelaysService} from './services/delays.service'
import {SharedModule} from 'src/app/shared/shared.module'
import {ReportService} from 'src/app/shared/services/common/report.service'
import {DialogService} from 'primeng/dynamicdialog'
import {DialogModule} from 'primeng/dialog'
import {NewDelaysComponent} from './pages/new-delays/new-delays.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {LeftIconModule} from 'src/app/shared/directives/left-icon/left-icon.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {NewDelaysDrawerModule} from './modules/new-delays-drawer/new-delays-drawer.module'
import {NewDelaysPageModalModule} from 'src/app/shared/modules/modals/new-delays-page-modal/new-delays-page-modal.module'

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
		DropdownModule,
		DialogModule,
		FormsModule,
		ProgressBarModule,
		MultiSelectModule,
		ReactiveFormsModule,
		CardModule,
		MenubarModule,
		AvatarModule,
		DelaysRoutingModule,
		SharedModule,
		SpacingModule,
		ButtonModule,
		InputModule,
		LabelModule,
		LeftIconModule,
		IconModule,
		SelectModule,
		DropdownPointModule,
		TableModule,
		PaginatorModule,
		RubModule,
		SkeletonModule,
		NewDelaysDrawerModule,
		NewDelaysPageModalModule
	],
	declarations: [DelaysPageComponent, NewDelaysComponent],
	providers: [DialogService, DelaysService, ReportService]
})
export class DelaysModule {}
