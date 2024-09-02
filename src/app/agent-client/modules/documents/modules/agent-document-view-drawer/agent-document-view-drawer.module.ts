import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AgentDocumentViewDrawerComponent} from './agent-document-view-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {AgentDocumentViewDrawerService} from './agent-document-view-drawer.service'

@NgModule({
	declarations: [AgentDocumentViewDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [AgentDocumentViewDrawerService]
})
export class AgentDocumentViewDrawerModule {}
