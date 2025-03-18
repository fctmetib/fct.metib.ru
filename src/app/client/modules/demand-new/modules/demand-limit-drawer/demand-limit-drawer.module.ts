import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandLimitDrawerComponent} from './demand-limit-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DemandLimitDrawerService} from './demand-limit-drawer.service'
import {CashPanelModule} from 'src/app/shared/modules/cash-panel/cash-panel.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {TextareaModule} from 'src/app/shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {InformationModule} from 'src/app/shared/ui-kit/information/information.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {DemandService} from '../../services/demand.service'
import { DlFileCellModule } from '../../../../../shared/ui-kit/dl-file-cell/dl-file-cell.module';
import { NgxMaskModule } from 'ngx-mask';
import { RightIconModule } from '../../../../../shared/directives/right-icon/right-icon.module';
import { BlurLoaderModule } from '../../../../../shared/ui-kit/blur-loader/blur-loader.module';
import { SendMessagesModule } from '../../../../../shared/ui-kit/send-messages/send-messages.module';
import { AttachedDocumentModule } from '../../../../../shared/ui-kit/attached-document/attached-document.module';
import { BadgeModule } from '../../../../../shared/ui-kit/badge/badge.module';
import { CheckboxModule } from '../../../../../shared/ui-kit/checkbox/checkbox.module';
import { DropdownPointModule } from '../../../../../shared/ui-kit/dropdown-point/dropdown-point.module';
import { MessageItemModule } from '../../../../../shared/ui-kit/message-item/message-item.module';
import { NavbarModule } from '../../../../../shared/ui-kit/navbar/navbar.module';
import { SelectModule } from '../../../../../shared/ui-kit/select/select.module';
import { SkeletonModule } from '../../../../../shared/ui-kit/skeleton/skeleton.module';
import { TabModule } from '../../../../../shared/ui-kit/tab/tab.module';
import { DynamicDataComponent } from '../../../reports/components/dynamic-data/dynamic-data.component';

@NgModule({
  declarations: [DemandLimitDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		SpacingModule,
		CashPanelModule,
		InputModule,
		LabelModule,
		TextareaModule,
		AutosizeModule,
		InformationModule,
		MibDragAndDropModule,
		ButtonModule,
		ReactiveFormsModule, FormsModule,
		RubModule, DlFileCellModule, NgxMaskModule, RightIconModule, BlurLoaderModule, SendMessagesModule, AttachedDocumentModule, BadgeModule, CheckboxModule, DropdownPointModule, MessageItemModule, NavbarModule, SelectModule, SkeletonModule, TabModule, DynamicDataComponent
	],
  providers: [DemandLimitDrawerService, DemandService]
})
export class DemandLimitDrawerModule {
}
