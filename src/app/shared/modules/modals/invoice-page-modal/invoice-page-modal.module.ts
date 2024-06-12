import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {InvoicePageModalComponent} from './invoice-page-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [InvoicePageModalComponent],
	imports: [CommonModule, ModalModule, SpacingModule]
})
export class InvoicePageModalModule {}
