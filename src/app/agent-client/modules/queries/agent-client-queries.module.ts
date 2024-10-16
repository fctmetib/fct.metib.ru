import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientQueriesRoutingModule} from './agent-client-queries-routing.module'
import {QueriesPageComponent} from './components/queries-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {RequestCardModule} from 'src/app/shared/modules/request-card/request-card.module'
import {LeftIconModule} from 'src/app/shared/directives/left-icon/left-icon.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {BadgeModule} from 'src/app/shared/ui-kit/badge/badge.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {AgentQueriesDrawerModule} from './modules/agent-queries-drawer/agent-queries-drawer.module'

@NgModule({
	declarations: [QueriesPageComponent],
	imports: [
		CommonModule,
		AgentClientQueriesRoutingModule,
		SpacingModule,
		TabModule,
		NavbarModule,
		RequestCardModule,
		ButtonModule,
		LeftIconModule,
		LabelModule,
		DropdownPointModule,
		SelectModule,
		InputModule,
		IconModule,
		PaginatorModule,
		BadgeModule,
		TableModule,
		SkeletonModule,
		AgentQueriesDrawerModule
	]
})
export class AgentClientQueriesModule {}
