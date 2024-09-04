import {NgModule} from '@angular/core'
import {CommonModule, DatePipe} from '@angular/common'

import {PaymentsPageComponent} from './components/payments-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentClientPaymentsPageRoutingModule} from './agent-client-payments-page-routing.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'
import {DatesService} from 'src/app/shared/services/dates.service'
import {PaymentsPageModalModule} from 'src/app/shared/modules/modals/payments-page-modal/payments-page-modal.module'
import {AgentPaymentsDrawerModule} from './modules/agent-payments-drawer/agent-payments-drawer.module'

@NgModule({
	declarations: [PaymentsPageComponent],
	imports: [
		CommonModule,
		AgentClientPaymentsPageRoutingModule,
		SpacingModule,
		InputModule,
		TableModule,
		ButtonModule,
		IconModule,
		SkeletonModule,
		DropdownModule,
		DropdownPointModule,
		PaginatorModule,
		RubModule,
		PaymentsPageModalModule,
		AgentPaymentsDrawerModule
	],
	providers: [DatesService, DatePipe]
})
export class AgentClientPaymentsModule {}
