import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ModalComponent} from './modal.component'
import {ModalFooterComponent} from './components/modal-footer/modal-footer.component'
import {ModalHeaderComponent} from './components/modal-header/modal-header.component'
import {ButtonModule} from '../button/button.module'
import {SpacingModule} from '../spacing/spacing.module'
import {IconModule} from '../ref-icon/icon.module'
import {BannerSuccessComponent} from './components/banner-success/banner-success.component'
import {BannerFailureComponent} from './components/banner-failure/banner-failure.component'
import {BannerInfoComponent} from './components/banner-info/banner-info.component'
import {BannerModalComponent} from './components/banner-modal/banner-modal.component'

@NgModule({
	declarations: [
		ModalComponent,
		ModalFooterComponent,
		ModalHeaderComponent,
		BannerSuccessComponent,
		BannerFailureComponent,
		BannerInfoComponent,
		BannerModalComponent
	],
	imports: [CommonModule, ButtonModule, IconModule, SpacingModule],
	exports: [
		ModalComponent,
		ModalFooterComponent,
		ModalHeaderComponent,
		BannerSuccessComponent,
		BannerFailureComponent,
		BannerInfoComponent,
		BannerModalComponent
	]
})
export class ModalModule {}
