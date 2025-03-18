import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DocumentsAgentPageModalComponent} from './documents-agent-page-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {MobileTablePopupModule} from 'src/app/shared/ui-kit/mobile-table-popup/mobile-table-popup.module'
import {AvatarModule} from 'src/app/shared/ui-kit/avatar/avatar.module'
import {FileCellModule} from 'src/app/shared/ui-kit/file-cell/file-cell.module'
import {DlFileCellModule} from 'src/app/shared/ui-kit/dl-file-cell/dl-file-cell.module'

@NgModule({
	declarations: [DocumentsAgentPageModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		SpacingModule,
		IconModule,
		ButtonModule,
		MobileTablePopupModule,
		AvatarModule,
		FileCellModule,
		DlFileCellModule
	]
})
export class DocumentsAgentPageModalModule {}
