import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FreeDutyPageModalComponent} from './free-duty-page-modal.component'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {MobileTablePopupModule} from 'src/app/shared/ui-kit/mobile-table-popup/mobile-table-popup.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'

@NgModule({
	declarations: [FreeDutyPageModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		SpacingModule,
		IconModule,
		ButtonModule,
		RubModule,
		MobileTablePopupModule
	]
})
export class FreeDutyPageModalModule {}
