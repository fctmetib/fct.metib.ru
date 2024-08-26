import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {RegisterPageComponent} from './components/register-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentClientRegisterPageRoutingModule} from './agent-client-register-page-routing.module'

@NgModule({
	declarations: [RegisterPageComponent],
	imports: [CommonModule, AgentClientRegisterPageRoutingModule, SpacingModule]
})
export class AgentClientRegisterModule {}
