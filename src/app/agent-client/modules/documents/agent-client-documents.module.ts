import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AgentClientDocumentsRoutingModule} from './agent-client-documents-routing.module'
import {DocumentsPageComponent} from './components/documents-page.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {AgentDocumentDrawerModule} from './modules/agent-document-drawer/agent-document-drawer.module'
import {AgentDocumentViewDrawerModule} from './modules/agent-document-view-drawer/agent-document-view-drawer.module'
import {AvatarModule} from 'src/app/shared/ui-kit/avatar/avatar.module'
import {DocumentsAgentPageModalModule} from 'src/app/shared/modules/modals/documents-agent-page-modal/documents-agent-page-modal.module'

@NgModule({
	declarations: [DocumentsPageComponent],
	imports: [
		CommonModule,
		AgentClientDocumentsRoutingModule,
		SpacingModule,
		InputModule,
		IconModule,
		PaginatorModule,
		SkeletonModule,
		TableModule,
		ButtonModule,
		DropdownPointModule,
		DropdownModule,
		AgentDocumentDrawerModule,
		AgentDocumentViewDrawerModule,
		AvatarModule,
		DocumentsAgentPageModalModule
	]
})
export class AgentClientDocumentsModule {}
