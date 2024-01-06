import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCorrectionModalComponent } from './request-correction-modal.component';
import {ModalModule} from '../../../ui-kit/modal/modal.module';
import {ButtonModule} from '../../../ui-kit/button/button.module';
import {SpacingModule} from '../../../ui-kit/spacing/spacing.module';
import {TableModule} from '../../../ui-kit/table/table.module';
import {DropdownPointModule} from '../../../ui-kit/dropdown-point/dropdown-point.module';
import {PaginatorModule} from '../../../ui-kit/paginator/paginator.module';
import {SelectModule} from '../../../ui-kit/select/select.module';



@NgModule({
  declarations: [
    RequestCorrectionModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    ButtonModule,
    SpacingModule,
    TableModule,
    DropdownPointModule,
    PaginatorModule,
    SelectModule
  ]
})
export class RequestCorrectionModalModule { }
