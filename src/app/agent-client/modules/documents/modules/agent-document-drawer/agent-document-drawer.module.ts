import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AgentDocumentDarwerComponent} from './agent-document-darwer.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentDocumentDrawerService} from './agent-document-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'

@NgModule({
	declarations: [AgentDocumentDarwerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [AgentDocumentDrawerService]
})
export class AgentDocumentDrawerModule {}
