import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ButtonModule} from '../../ui-kit/button/button.module'
import {InputModule} from '../../ui-kit/input/input.module'
import {MibUiComponent} from './mib-ui.component'
import {IconModule} from '../../ui-kit/ref-icon/icon.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {SpacingModule} from '../../ui-kit/spacing/spacing.module'
import {BadgeModule} from '../../ui-kit/badge/badge.module'
import {CheckboxModule} from '../../ui-kit/checkbox/checkbox.module'
import {TagModule} from '../../ui-kit/tag/tag.module'
import {RadioModule} from '../../ui-kit/radio/radio.module'
import {SwitchModule} from '../../ui-kit/switch/switch.module'
import {HeaderModule} from '../header/header.module'
import {ToasterModule} from '../../ui-kit/toaster/toaster.module'
import {MediaModule} from '../../ui-kit/media/media.module'
import {FileCellModule} from '../../ui-kit/file-cell/file-cell.module'
import {ContractedFormsModule} from '../../ui-kit/contracted-forms/contracted-forms.module'
import {ModalModule} from '../../ui-kit/modal/modal.module'
import {NewShipmentModalModule} from '../modals/new-shipment-modal/new-shipment-modal.module'
import {RequestCreateSuccessModalModule} from 'src/app/client/modules/requests/modules/request-create-success-modal/request-create-success-modal.module'
import {CommentPanelModule} from '../../ui-kit/comment-panel/comment-panel.module'
import {RequestFailureModalModule} from '../modals/request-failure-modal/request-failure-modal.module'
import {RequestInfoModalModule} from '../modals/request-info-modal/request-info-modal.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		IconModule,
		InputModule,
		SpacingModule,
		BadgeModule,
		CheckboxModule,
		TagModule,
		RadioModule,
		SwitchModule,
		HeaderModule,
		ToasterModule,
		MediaModule,
		FileCellModule,
		ContractedFormsModule,
		ModalModule,
		NewShipmentModalModule,
		RequestCreateSuccessModalModule,
		CommentPanelModule,
		RequestFailureModalModule,
		RequestInfoModalModule
	],
	declarations: [MibUiComponent]
})
export class MibUiModule {}
