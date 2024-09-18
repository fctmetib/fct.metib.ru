import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContractsFactoringModalComponent} from './contracts-factoring-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {MobileTablePopupModule} from 'src/app/shared/ui-kit/mobile-table-popup/mobile-table-popup.module'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'

@NgModule({
	declarations: [ContractsFactoringModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		SpacingModule,
		IconModule,
		ButtonModule,
		MobileTablePopupModule,
		TagModule,
		RubModule
	]
})
export class ContractsFactoringModalModule {}
