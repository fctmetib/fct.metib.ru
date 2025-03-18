import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandSignatureDrawerComponent} from './demand-signature-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {DemandSignatureDrawerService} from './demand-signature-drawer.service'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {InformationModule} from 'src/app/shared/ui-kit/information/information.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {TabModule} from '../../../../../shared/ui-kit/tab/tab.module'
import {RightIconModule} from 'src/app/shared/directives/right-icon/right-icon.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {CheckboxModule} from 'src/app/shared/ui-kit/checkbox/checkbox.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {FileCellModule} from 'src/app/shared/ui-kit/file-cell/file-cell.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {
  DemandSignatureThirdStepComponent
} from './components/demand-signature-third-step/demand-signature-third-step.component'
import {
  DemandSignatureFirstStepComponent
} from './components/demand-signature-first-step/demand-signature-first-step.component'
import {
  DemandSignatureSecondStepComponent
} from './components/demand-signature-second-step/demand-signature-second-step.component'
import {
  DemandSignatureFourthStepComponent
} from './components/demand-signature-fourth-step/demand-signature-fourth-step.component'
import { DemandSignatureDrawerStaticService } from './demand-signature-drawer-static.service';
import { DlFileCellModule } from '../../../../../shared/ui-kit/dl-file-cell/dl-file-cell.module';
import { LeftIconModule } from '../../../../../shared/directives/left-icon/left-icon.module';
import { BadgeModule } from '../../../../../shared/ui-kit/badge/badge.module';
import { AttachedDocumentModule } from '../../../../../shared/ui-kit/attached-document/attached-document.module';
import { MessageItemModule } from '../../../../../shared/ui-kit/message-item/message-item.module';
import { SkeletonModule } from '../../../../../shared/ui-kit/skeleton/skeleton.module';
import { SendMessagesModule } from '../../../../../shared/ui-kit/send-messages/send-messages.module';
import { DemandSignatureEventsTabComponent } from './components/demand-signature-events-tab/demand-signature-events-tab.component';
import { AccordionItemModule } from '../../../../../shared/ui-kit/accordion-item/accordion-item.module';
import {
  AccordionWithShadowModule
} from '../../../../../shared/ui-kit/accordion-with-shadow/accordion-with-shadow.module';
import { DemandSignatureInfoTabComponent } from './components/demand-signature-info-tab/demand-signature-info-tab.component';
import { DemandSignatureDocsTabComponent } from './components/demand-signature-docs-tab/demand-signature-docs-tab.component';
import { DemandSignatureResultTabComponent } from './components/demand-signature-result-tab/demand-signature-result-tab.component';
import { BlurLoaderModule } from '../../../../../shared/ui-kit/blur-loader/blur-loader.module';

@NgModule({
  declarations: [
    DemandSignatureDrawerComponent,
    DemandSignatureFirstStepComponent,
    DemandSignatureSecondStepComponent,
    DemandSignatureThirdStepComponent,
    DemandSignatureFourthStepComponent,
    DemandSignatureEventsTabComponent,
    DemandSignatureInfoTabComponent,
    DemandSignatureDocsTabComponent,
    DemandSignatureResultTabComponent
  ],
  imports: [
    CommonModule,
    DrawerModule,
    SpacingModule,
    InformationModule,
    NavbarModule,
    ButtonModule,
    InputModule,
    LabelModule,
    TabModule,
    RightIconModule,
    IconModule,
    SelectModule,
    DropdownPointModule,
    CheckboxModule,
    MibDragAndDropModule,
    FileCellModule,
    FormsModule,
    ReactiveFormsModule,
    DlFileCellModule,
    LeftIconModule,
    BadgeModule,
    AttachedDocumentModule,
    MessageItemModule,
    SkeletonModule,
    SendMessagesModule,
    AccordionItemModule,
    AccordionWithShadowModule,
    BlurLoaderModule
  ],
  providers: [],
  exports: [DemandSignatureFirstStepComponent]
})
export class DemandSignatureDrawerModule {
}
