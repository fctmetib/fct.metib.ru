import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShipmentDrawerComponent} from './shipment-drawer.component';
import {DrawerModule} from '../../../../../shared/ui-kit/drawer/drawer.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ButtonModule} from '../../../../../shared/ui-kit/button/button.module';
import {SpacingModule} from '../../../../../shared/ui-kit/spacing/spacing.module';
import {InputModule} from '../../../../../shared/ui-kit/input/input.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ShipmentDrawerService} from './services/shipment-drawer.service';
import {NgxMaskModule} from 'ngx-mask';
import {RightIconModule} from '../../../../../shared/directives/right-icon/right-icon.module';
import {LabelModule} from '../../../../../shared/directives/label/label.module';


@NgModule({
  declarations: [
    ShipmentDrawerComponent
  ],
    imports: [
        CommonModule,
        DrawerModule,
        MatDialogModule,
        ButtonModule,
        SpacingModule,
        InputModule,
        ReactiveFormsModule,
        NgxMaskModule,
        RightIconModule,
        LabelModule
    ],
  providers: [
    ShipmentDrawerService
  ]
})
export class ShipmentDrawerModule {
}
