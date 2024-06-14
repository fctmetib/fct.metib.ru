import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {InvoicePageModalComponent} from './invoice-page-modal.component'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'
import {LinkModule} from 'src/app/shared/ui-kit/link/link.module'
import {RouterModule} from '@angular/router'
import {RightIconModule} from 'src/app/shared/directives/right-icon/right-icon.module'

@NgModule({
	declarations: [InvoicePageModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		SpacingModule,
		IconModule,
		ButtonModule,
		RubModule,
		LinkModule,
		RightIconModule,
		RouterModule
	]
})
export class InvoicePageModalModule {}
