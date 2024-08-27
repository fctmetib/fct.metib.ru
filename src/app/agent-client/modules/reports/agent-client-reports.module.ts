import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientReportsRoutingModule} from './agent-client-reports-routing.module'
import {ReportsPageComponent} from './components/reports-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [ReportsPageComponent],
	imports: [CommonModule, AgentClientReportsRoutingModule, SpacingModule]
})
export class AgentClientReportsModule {}
