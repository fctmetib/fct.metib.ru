import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryAgreementDrawerComponent} from './delivery-agreement-drawer.component';
import {DrawerModule} from '../../../../../shared/ui-kit/drawer/drawer.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ButtonModule} from '../../../../../shared/ui-kit/button/button.module';
import {SpacingModule} from '../../../../../shared/ui-kit/spacing/spacing.module';
import {InputModule} from '../../../../../shared/ui-kit/input/input.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DeliveryAgreementDrawerService} from './services/delivery-agreement-drawer.service';


@NgModule({
  declarations: [
    DeliveryAgreementDrawerComponent
  ],
  imports: [
    CommonModule,
    DrawerModule,
    MatDialogModule,
    ButtonModule,
    SpacingModule,
    InputModule,
    ReactiveFormsModule
  ],
  providers: [
    DeliveryAgreementDrawerService
  ]
})
export class DeliveryAgreementDrawerModule {
}
