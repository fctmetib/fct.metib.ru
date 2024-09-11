import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AgentQueriesDrawerComponent} from './agent-queries-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentQueriesDrawerService} from './agent-queries-drawer.service'

@NgModule({
	declarations: [AgentQueriesDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [AgentQueriesDrawerService]
})
export class AgentQueriesDrawerModule {}
