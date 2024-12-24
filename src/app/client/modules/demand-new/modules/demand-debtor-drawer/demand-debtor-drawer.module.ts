import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandDebtorDrawerComponent} from './demand-debtor-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DemandDebtorDrawerService} from './demand-debtor-drawer.service'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {CheckboxModule} from 'src/app/shared/ui-kit/checkbox/checkbox.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {LeftIconModule} from 'src/app/shared/directives/left-icon/left-icon.module'
import {LinkModule} from 'src/app/shared/ui-kit/link/link.module'
import {FileCellModule} from 'src/app/shared/ui-kit/file-cell/file-cell.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InformationModule} from 'src/app/shared/ui-kit/information/information.module'
import {DemandService} from '../../services/demand.service'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { DlFileCellModule } from '../../../../../shared/ui-kit/dl-file-cell/dl-file-cell.module';
import { MibDragAndDropModule } from '../../../../../shared/ui-kit/drag-and-drop/mib-drag-and-drop.module';
import { DemandDebtorDrawerStaticService } from './demand-debtor-drawer-static.service';
import { BadgeModule } from '../../../../../shared/ui-kit/badge/badge.module';
import { AttachedDocumentModule } from '../../../../../shared/ui-kit/attached-document/attached-document.module';
import { MessageItemModule } from '../../../../../shared/ui-kit/message-item/message-item.module';
import { SkeletonModule } from '../../../../../shared/ui-kit/skeleton/skeleton.module';
import { SendMessagesModule } from '../../../../../shared/ui-kit/send-messages/send-messages.module';
import { BlurLoaderModule } from '../../../../../shared/ui-kit/blur-loader/blur-loader.module';

@NgModule({
  declarations: [DemandDebtorDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		SpacingModule,
		TabModule,
		NavbarModule,
		ButtonModule,
		SelectModule,
		DropdownPointModule,
		CheckboxModule,
		InputModule,
		LabelModule,
		LeftIconModule,
		LinkModule,
		FileCellModule,
		IconModule,
		InformationModule,
		ReactiveFormsModule,
		FormsModule,
		DlFileCellModule,
		MibDragAndDropModule,
		BadgeModule,
		AttachedDocumentModule,
		MessageItemModule,
		SkeletonModule,
		SendMessagesModule,
		BlurLoaderModule
	],
  providers: [DemandDebtorDrawerService, DemandDebtorDrawerStaticService, DemandService]
})
export class DemandDebtorDrawerModule {
}
