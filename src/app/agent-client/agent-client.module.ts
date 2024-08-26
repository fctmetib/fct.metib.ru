import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientRoutingModule} from './agent-client-routing.module'
import {AgentClientCabinetModule} from './modules/cabinet/agent-client-cabinet.module'
import {AgentClientComponent} from './agent-client.component'
import {SidebarModule} from '../shared/ui-kit/sidebar/sidebar.module'
import {HeaderModule} from '../shared/modules/header/header.module'
import {SpacingModule} from '../shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [AgentClientComponent],
	imports: [
		CommonModule,
		AgentClientRoutingModule,
		AgentClientCabinetModule,
		SidebarModule,
		HeaderModule,
		SpacingModule
	]
})
export class AgentClientModule {}
