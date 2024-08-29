import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LandingLoginModalComponent} from './landing-login-modal.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {NgxMaskModule} from 'ngx-mask'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {RightIconModule} from 'src/app/shared/directives/right-icon/right-icon.module'
import {PasswordHiderModule} from 'src/app/shared/directives/password-hider/password-hider.module'
import {LinkModule} from 'src/app/shared/ui-kit/link/link.module'
import {RouterLink} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
	declarations: [LandingLoginModalComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SpacingModule,
		ModalModule,
		LabelModule,
		InputModule,
		IconModule,
		NgxMaskModule.forRoot(),
		ButtonModule,
		RightIconModule,
		PasswordHiderModule,
		LinkModule,
		RouterLink
	]
})
export class LandingLoginModalModule {}
