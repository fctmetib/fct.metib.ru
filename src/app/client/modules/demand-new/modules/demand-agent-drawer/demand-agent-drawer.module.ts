import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DemandAgentDrawerComponent} from './demand-agent-drawer.component'
import {DemandAgentDrawerService} from './demand-agent-drawer.service'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'

@NgModule({
	declarations: [DemandAgentDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule, ButtonModule],
	providers: [DemandAgentDrawerService]
})
export class DemandAgentDrawerModule {}
