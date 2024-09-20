import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContractsAgentPageModalComponent} from './contracts-agent-page-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {MobileTablePopupModule} from 'src/app/shared/ui-kit/mobile-table-popup/mobile-table-popup.module'

@NgModule({
	declarations: [ContractsAgentPageModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		SpacingModule,
		IconModule,
		ButtonModule,
		MobileTablePopupModule
	]
})
export class ContractsAgentPageModalModule {}
