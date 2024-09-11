import {NgModule} from '@angular/core'
import {CommonModule, DatePipe} from '@angular/common'
import {InvoiceDrawerComponent} from './invoice-drawer.component'
import {InvoiceDrawerService} from './invoice-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {ContractedFormsModule} from 'src/app/shared/ui-kit/contracted-forms/contracted-forms.module'
import {TextareaModule} from '../../../../../shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {CashPanelModule} from 'src/app/shared/modules/cash-panel/cash-panel.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'

@NgModule({
	declarations: [InvoiceDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		TableModule,
		ButtonModule,
		IconModule,
		TabModule,
		NavbarModule,
		SelectModule,
		DropdownPointModule,
		SkeletonModule,
		PaginatorModule,
		DropdownModule,
		RubModule,
		InputModule,
		ContractedFormsModule,
		TextareaModule,
		AutosizeModule,
		CashPanelModule,
		LabelModule
	],
	providers: [InvoiceDrawerService, DatePipe]
})
export class InvoiceDrawerModule {}
