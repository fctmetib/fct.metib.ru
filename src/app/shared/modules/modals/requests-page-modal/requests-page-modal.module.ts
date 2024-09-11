import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RequestsPageModalComponent} from './requests-page-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {MobileTablePopupModule} from 'src/app/shared/ui-kit/mobile-table-popup/mobile-table-popup.module'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'

@NgModule({
	declarations: [RequestsPageModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		SpacingModule,
		IconModule,
		ButtonModule,
		MobileTablePopupModule,
		TagModule
	]
})
export class RequestsPageModalModule {}
