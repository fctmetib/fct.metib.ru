import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {RegisterPageComponent} from './components/register-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentClientRegisterPageRoutingModule} from './agent-client-register-page-routing.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {AgentRegisterViewDrawerModule} from './modules/agent-register-view-drawer/agent-register-view-drawer.module'
import {AgentRegisterDrawerModule} from './modules/agent-register-drawer/agent-register-drawer.module'
import {BadgeModule} from 'src/app/shared/ui-kit/badge/badge.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'

@NgModule({
	declarations: [RegisterPageComponent],
	imports: [
		CommonModule,
		AgentClientRegisterPageRoutingModule,
		SpacingModule,
		InputModule,
		IconModule,
		PaginatorModule,
		SkeletonModule,
		TableModule,
		ButtonModule,
		DropdownPointModule,
		DropdownModule,
		AgentRegisterDrawerModule,
		AgentRegisterViewDrawerModule,
		BadgeModule,
		RubModule
	]
})
export class AgentClientRegisterModule {}
