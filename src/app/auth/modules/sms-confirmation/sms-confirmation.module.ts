import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SmsConfirmationComponent} from './sms-confirmation.component';
import {ButtonModule} from '../../../shared/ui-kit/button/button.module';
import {InputModule} from '../../../shared/ui-kit/input/input.module';
import {LinkModule} from '../../../shared/ui-kit/link/link.module';
import {SpacingModule} from '../../../shared/ui-kit/spacing/spacing.module';
import {NgxMaskModule} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SmsConfirmationComponent
  ],
  exports: [
    SmsConfirmationComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputModule,
    LinkModule,
    SpacingModule,
    NgxMaskModule,
    ReactiveFormsModule
  ]
})
export class SmsConfirmationModule {
}
