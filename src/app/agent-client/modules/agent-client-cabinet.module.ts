import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientCabinetRoutingModule} from './agent-client-cabinet-routing.module'
import {CabinetPageComponent} from './components/cabinet-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [CabinetPageComponent],
	imports: [CommonModule, AgentClientCabinetRoutingModule, SpacingModule]
})
export class AgentClientCabinetModule {}
