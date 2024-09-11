import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewDelaysDrawerComponent} from './new-delays-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {NewDelaysDrawerService} from './new-delays-drawer.service'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'
import {CashPanelModule} from 'src/app/shared/modules/cash-panel/cash-panel.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'

@NgModule({
	declarations: [NewDelaysDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		SpacingModule,
		ButtonModule,
		IconModule,
		InputModule,
		SkeletonModule,
		TagModule,
		CashPanelModule,
		RubModule,
		TableModule,
		PaginatorModule,
		SelectModule,
		DropdownPointModule
	],
	providers: [NewDelaysDrawerService]
})
export class NewDelaysDrawerModule {}
