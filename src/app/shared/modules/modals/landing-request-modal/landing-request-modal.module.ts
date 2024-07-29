import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LandingRequestModalComponent} from './landing-request-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'

@NgModule({
	declarations: [LandingRequestModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		ButtonModule,
		SpacingModule,
		InputModule,
		IconModule,
		LabelModule
	]
})
export class LandingRequestModalModule {}
