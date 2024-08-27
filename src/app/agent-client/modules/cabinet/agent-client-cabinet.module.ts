import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {CabinetPageComponent} from './components/cabinet-page.component'
import {AgentClientCabinetRoutingModule} from './agent-client-cabinet-routing.module'
import {AgentFactoringComponent} from './components/agent-factoring/agent-factoring.component'
import {CashPanelModule} from 'src/app/shared/modules/cash-panel/cash-panel.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'

@NgModule({
	declarations: [CabinetPageComponent, AgentFactoringComponent],
	imports: [
		CommonModule,
		AgentClientCabinetRoutingModule,
		SpacingModule,
		CashPanelModule,
		SkeletonModule,
		RubModule,
		ButtonModule,
		IconModule
	]
})
export class AgentClientCabinetModule {}
