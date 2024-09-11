import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignPinModalComponent} from './sign-pin-modal.component';
import {ModalModule} from '../../../ui-kit/modal/modal.module';
import {SpacingModule} from '../../../ui-kit/spacing/spacing.module';
import {ButtonModule} from '../../../ui-kit/button/button.module';
import {CodeInputModule} from '../../../ui-kit/code-input/code-input.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RequestsService} from '../../../../client/modules/requests/services/requests.service';


@NgModule({
  declarations: [
    SignPinModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    SpacingModule,
    ButtonModule,
    CodeInputModule,
    ReactiveFormsModule
  ],
  providers: [
    RequestsService,
  ]
})
export class SignPinModalModule {
}
