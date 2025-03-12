import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandEditingDrawerComponent} from './demand-editing-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DemandEditingDrawerService} from './demand-editing-drawer.service'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {CheckboxModule} from 'src/app/shared/ui-kit/checkbox/checkbox.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {FileCellModule} from 'src/app/shared/ui-kit/file-cell/file-cell.module'
import {DemandService} from '../../services/demand.service'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { DlFileCellModule } from '../../../../../shared/ui-kit/dl-file-cell/dl-file-cell.module';
import { BadgeModule } from 'src/app/shared/ui-kit/badge/badge.module'
import { BlurLoaderModule } from 'src/app/shared/ui-kit/blur-loader/blur-loader.module'
import { AttachedDocumentModule } from '../../../../../shared/ui-kit/attached-document/attached-document.module';
import { MessageItemModule } from '../../../../../shared/ui-kit/message-item/message-item.module';
import { NavbarModule } from '../../../../../shared/ui-kit/navbar/navbar.module';
import { SkeletonModule } from '../../../../../shared/ui-kit/skeleton/skeleton.module';
import { TabModule } from '../../../../../shared/ui-kit/tab/tab.module';
import { SendMessagesModule } from '../../../../../shared/ui-kit/send-messages/send-messages.module';
import { DynamicDataComponent } from '../../../reports/components/dynamic-data/dynamic-data.component';

@NgModule({
  declarations: [DemandEditingDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		SpacingModule,
		ButtonModule,
		InputModule,
		LabelModule,
		CheckboxModule,
		MibDragAndDropModule,
		SelectModule,
		DropdownPointModule,
		FileCellModule,
		ReactiveFormsModule,
		BadgeModule,
		FormsModule,
		DlFileCellModule,
		BlurLoaderModule,
		AttachedDocumentModule,
		MessageItemModule,
		NavbarModule,
		SkeletonModule,
		TabModule,
		SendMessagesModule,
		DynamicDataComponent
	],
  providers: [DemandEditingDrawerService, DemandService]
})
export class DemandEditingDrawerModule {
}
