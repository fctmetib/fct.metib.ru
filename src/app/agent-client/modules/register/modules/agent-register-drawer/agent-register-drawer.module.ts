import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AgentRegisterDrawerComponent} from './agent-register-drawer.component'
import {AgentRegisterDrawerService} from './agent-register-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [AgentRegisterDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [AgentRegisterDrawerService]
})
export class AgentRegisterDrawerModule {}
