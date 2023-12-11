import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RequestDrawerComponent} from './request-drawer.component'
import {DrawerModule} from '../../../../../shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from '../../../../../shared/ui-kit/spacing/spacing.module'
import {TableModule} from '../../../../../shared/ui-kit/table/table.module'
import {ButtonModule} from '../../../../../shared/ui-kit/button/button.module'
import {RefIconModule} from '../../../../../shared/ui-kit/ref-icon/ref-icon.module'
import {SelectModule} from '../../../../../shared/ui-kit/select/select.module'
import {DropdownPointModule} from '../../../../../shared/ui-kit/dropdown-point/dropdown-point.module'
import {ReactiveFormsModule} from '@angular/forms'
import {CheckboxModule} from '../../../../../shared/ui-kit/checkbox/checkbox.module'
import {PaginatorModule} from '../../../../../shared/ui-kit/paginator/paginator.module'
import {RequestDrawerService} from './request-drawer.service';
import {InputModule} from '../../../../../shared/ui-kit/input/input.module';
import {MibDragAndDropModule} from '../../../../../shared/ui-kit/drag-and-drop/mib-drag-and-drop.module';
import {InformationModule} from '../../../../../shared/ui-kit/information/information.module';
import {DeliveryAgreementDrawerModule} from '../delivery-agreement-drawer/delivery-agreement-drawer.module';

@NgModule({
  declarations: [RequestDrawerComponent],
  imports: [
    CommonModule,
    DrawerModule,
    MatDialogModule,
    SpacingModule,
    TableModule,
    ButtonModule,
    RefIconModule,
    SelectModule,
    DropdownPointModule,
    ReactiveFormsModule,
    CheckboxModule,
    PaginatorModule,
    InputModule,
    MibDragAndDropModule,
    InformationModule,
    DeliveryAgreementDrawerModule
  ],
  providers: [
    RequestDrawerService
  ]
})
export class RequestDrawerModule {
}
