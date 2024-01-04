import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ModalComponent} from './modal.component'
import {ModalFooterComponent} from './components/modal-footer/modal-footer.component'
import {ModalHeaderComponent} from './components/modal-header/modal-header.component'
import {ButtonModule} from '../button/button.module'
import {SpacingModule} from '../spacing/spacing.module'
import {IconModule} from '../ref-icon/icon.module';

@NgModule({
	declarations: [ModalComponent, ModalFooterComponent, ModalHeaderComponent],
	imports: [CommonModule, ButtonModule, IconModule, SpacingModule],
	exports: [ModalComponent, ModalFooterComponent, ModalHeaderComponent]
})
export class ModalModule {}
