import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PaymentsPageModalComponent} from './payments-page-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'

@NgModule({
	declarations: [PaymentsPageModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		SpacingModule,
		IconModule,
		ButtonModule,
		RubModule
	]
})
export class PaymentsPageModalModule {}
