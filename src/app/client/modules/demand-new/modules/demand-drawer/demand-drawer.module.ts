import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandDrawerComponent} from './demand-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {DemandDrawerService} from './demand-drawer.service'
import {TextareaModule} from '../../../../../shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {LabelModule} from '../../../../../shared/directives/label/label.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {ReactiveFormsModule} from '@angular/forms'
import {InformationModule} from 'src/app/shared/ui-kit/information/information.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {FileCellModule} from 'src/app/shared/ui-kit/file-cell/file-cell.module'
import {RequestFailureModalModule} from 'src/app/shared/modules/modals/request-failure-modal/request-failure-modal.module'
import {DlFileCellModule} from 'src/app/shared/ui-kit/dl-file-cell/dl-file-cell.module'
import {BadgeModule} from '../../../../../shared/ui-kit/badge/badge.module'
import {TabModule} from '../../../../../shared/ui-kit/tab/tab.module'
import {NavbarModule} from '../../../../../shared/ui-kit/navbar/navbar.module'
import { MessageItemModule } from '../../../../../shared/ui-kit/message-item/message-item.module';
import { SendMessagesModule } from '../../../../../shared/ui-kit/send-messages/send-messages.module';
import { AttachedDocumentModule } from '../../../../../shared/ui-kit/attached-document/attached-document.module';
import { BlurLoaderModule } from '../../../../../shared/ui-kit/blur-loader/blur-loader.module';

@NgModule({
	declarations: [DemandDrawerComponent],
  imports: [
    CommonModule,
    DrawerModule,
    MatDialogModule,
    SpacingModule,
    ButtonModule,
    IconModule,
    MibDragAndDropModule,
    InputModule,
    TextareaModule,
    AutosizeModule,
    LabelModule,
    SkeletonModule,
    ReactiveFormsModule,
    InformationModule,
    TableModule,
    DropdownPointModule,
    DropdownModule,
    FileCellModule,
    RequestFailureModalModule,
    DlFileCellModule,
    BadgeModule,
    TabModule,
    NavbarModule,
    MessageItemModule,
    SendMessagesModule,
    AttachedDocumentModule,
    BlurLoaderModule
  ],
	providers: [DemandDrawerService]
})
export class DemandDrawerModule {}
