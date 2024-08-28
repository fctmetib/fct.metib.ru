import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientQueriesRoutingModule} from './agent-client-queries-routing.module'
import {QueriesPageComponent} from './components/queries-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [QueriesPageComponent],
	imports: [CommonModule, AgentClientQueriesRoutingModule, SpacingModule]
})
export class AgentClientQueriesModule {}
