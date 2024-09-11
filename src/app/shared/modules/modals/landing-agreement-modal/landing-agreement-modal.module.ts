import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LandingAgreementModalComponent} from './landing-agreement-modal.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'

@NgModule({
	declarations: [LandingAgreementModalComponent],
	imports: [CommonModule, SpacingModule, ModalModule]
})
export class LandingAgreementModalModule {}
