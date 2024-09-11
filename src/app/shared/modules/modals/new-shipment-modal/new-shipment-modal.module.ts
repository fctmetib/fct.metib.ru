import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewShipmentModalComponent} from './new-shipment-modal.component'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {ModalModule} from 'src/app/shared/ui-kit/modal/modal.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'

@NgModule({
	declarations: [NewShipmentModalComponent],
	imports: [
		CommonModule,
		ModalModule,
		ButtonModule,
		SpacingModule,
		InputModule,
		IconModule
	]
})
export class NewShipmentModalModule {}
