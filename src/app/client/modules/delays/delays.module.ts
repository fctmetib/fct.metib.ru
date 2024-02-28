import {DelaysRoutingModule} from './delays-routing.module'
import {CommonModule} from '@angular/common'
import {DropdownModule} from 'primeng/dropdown'
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
import {DelaysPageComponent} from './delays-page/delays-page.component'
import {DelaysService} from './services/delays.service'
import {SharedModule} from 'src/app/shared/shared.module'
import {ReportService} from 'src/app/shared/services/common/report.service'
import {DialogService} from 'primeng/dynamicdialog'
import {DialogModule} from 'primeng/dialog'
import {NewDelaysComponent} from './pages/new-delays/new-delays.component'

@NgModule({
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule,
		RadioButtonModule,
		InputTextareaModule,
		SliderModule,
		TableModule,
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
		SharedModule
	],
	declarations: [DelaysPageComponent, NewDelaysComponent],
	providers: [DialogService, DelaysService, ReportService]
})
export class DelaysModule {}
