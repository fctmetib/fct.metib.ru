import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientDocumentsRoutingModule} from './agent-client-documents-routing.module'
import {DocumentsPageComponent} from './components/documents-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [DocumentsPageComponent],
	imports: [CommonModule, AgentClientDocumentsRoutingModule, SpacingModule]
})
export class AgentClientDocumentsModule {}
