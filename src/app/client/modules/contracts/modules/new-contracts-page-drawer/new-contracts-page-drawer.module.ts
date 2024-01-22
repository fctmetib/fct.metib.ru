import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewContractsPageDrawerComponent} from './new-contracts-page-drawer.component'
import {NewContractsPageDrawerService} from './new-contracts-page-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {MatDialogModule} from '@angular/material/dialog'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'
import {CashPanelModule} from 'src/app/shared/modules/cash-panel/cash-panel.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {ContractedFormsModule} from 'src/app/shared/ui-kit/contracted-forms/contracted-forms.module'

@NgModule({
	declarations: [NewContractsPageDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		ButtonModule,
		IconModule,
		InputModule,
		SkeletonModule,
		TagModule,
		CashPanelModule,
		TableModule,
		PaginatorModule,
		TabModule,
		DropdownModule,
		DropdownPointModule,
		NavbarModule,
		SelectModule,
		ContractedFormsModule
	],
	providers: [NewContractsPageDrawerService]
})
export class NewContractsPageDrawerModule {}
