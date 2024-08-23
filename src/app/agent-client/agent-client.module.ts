import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientRoutingModule} from './agent-client-routing.module'
import {AgentClientComponent} from './agent-client.component'
import {AgentClientCabinetModule} from './modules/agent-client-cabinet.module'
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
