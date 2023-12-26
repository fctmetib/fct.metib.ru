import {SharedModule} from 'src/app/shared/shared.module'
import {InvoicesRoutingModule} from './invoices-routing.module'
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
import {InvoicePageComponent} from './components/invoice-page/invoice-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'

import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {RefIconModule} from 'src/app/shared/ui-kit/ref-icon/ref-icon.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {InvoicesPageComponent} from './pages/invoices-page/invoices-page.component'
import {InvoicesService} from './services/invoices.service'

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
		InvoicesRoutingModule,
		SharedModule,
		SpacingModule,
		ButtonModule,
		InputModule,
		DropdownPointModule,
		SelectModule,
		TableModule,
		SkeletonModule,
		RefIconModule,
		PaginatorModule
	],
	declarations: [InvoicePageComponent, InvoicesPageComponent],
	providers: [DatePipe, InvoicesService]
})
export class InvoicesModule {}
