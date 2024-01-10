import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RequestInfoModalComponent} from './request-info-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {RequestInfoModalService} from './request-info-modal.service'

@NgModule({
	declarations: [RequestInfoModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		ButtonModule,
		SpacingModule,
		InputModule,
		IconModule
	]
})
export class RequestInfoModalModule {}
