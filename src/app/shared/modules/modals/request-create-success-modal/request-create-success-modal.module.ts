import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RequestCreateSuccessModalComponent} from './request-create-success-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {RequestCreateSuccessModalService} from './request-create-success-modal.service'

@NgModule({
	declarations: [RequestCreateSuccessModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		ButtonModule,
		SpacingModule,
		InputModule,
		IconModule
	],
	providers: [RequestCreateSuccessModalService]
})
export class RequestCreateSuccessModalModule {}
