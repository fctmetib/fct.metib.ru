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
import {RubModule} from '../../../pipes/rub/rub.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RequestsService} from '../../../../client/modules/requests/services/requests.service';
import {
  RequestBrowserDrawerService
} from '../../../../client/modules/requests/modules/request-browser-drawer/request-browser-drawer.service';
import {InputModule} from '../../../ui-kit/input/input.module';
import {IconModule} from '../../../ui-kit/ref-icon/icon.module';
import {RightIconModule} from '../../../directives/right-icon/right-icon.module';
import {NgxMaskModule} from 'ngx-mask';



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
    SelectModule,
    RubModule,
    ReactiveFormsModule,
    InputModule,
    IconModule,
    RightIconModule,
    NgxMaskModule
  ],
  providers: [RequestsService, RequestBrowserDrawerService]
})
export class RequestCorrectionModalModule { }
