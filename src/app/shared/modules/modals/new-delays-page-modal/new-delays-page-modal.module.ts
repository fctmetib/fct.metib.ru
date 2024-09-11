import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewDelaysPageModalComponent} from './new-delays-page-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'

@NgModule({
	declarations: [NewDelaysPageModalComponent],
	imports: [CommonModule, ModalModule, SpacingModule, IconModule, ButtonModule]
})
export class NewDelaysPageModalModule {}
