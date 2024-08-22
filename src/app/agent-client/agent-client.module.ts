import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientRoutingModule} from './agent-client-routing.module'
import {AgentClientComponent} from './agent-client.component';
import { AgentClientCabinetModule } from './modules/agent-client-cabinet.module'

@NgModule({
	declarations: [AgentClientComponent],
	imports: [CommonModule, AgentClientRoutingModule, AgentClientCabinetModule]
})
export class AgentClientModule {}
