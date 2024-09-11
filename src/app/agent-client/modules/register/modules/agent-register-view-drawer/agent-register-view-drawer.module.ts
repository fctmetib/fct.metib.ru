import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AgentRegisterViewDrawerComponent} from './agent-register-view-drawer.component'
import {AgentRegisterViewDrawerService} from './agent-register-view-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [AgentRegisterViewDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [AgentRegisterViewDrawerService]
})
export class AgentRegisterViewDrawerModule {}
