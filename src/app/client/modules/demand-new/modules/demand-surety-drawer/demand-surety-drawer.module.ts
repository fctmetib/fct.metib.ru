import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandSuretyDrawerComponent} from './demand-surety-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {InformationModule} from 'src/app/shared/ui-kit/information/information.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {RightIconModule} from 'src/app/shared/directives/right-icon/right-icon.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {DemandSuretyDrawerService} from './demand-surety-drawer.service'
import {LeftIconModule} from 'src/app/shared/directives/left-icon/left-icon.module'
import {TextareaModule} from 'src/app/shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {LinkModule} from 'src/app/shared/ui-kit/link/link.module'
import {BadgeModule} from 'src/app/shared/ui-kit/badge/badge.module'
import {ContractedFormsModule} from 'src/app/shared/ui-kit/contracted-forms/contracted-forms.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {DemandService} from '../../services/demand.service';
import { DemandSuretyDrawerSecondStepComponent } from './demand-surety-drawer-second-step/demand-surety-drawer-second-step.component'
import {DemandSignatureDrawerModule} from '../demand-signature-drawer/demand-signature-drawer.module'
import {CheckboxModule} from '../../../../../shared/ui-kit/checkbox/checkbox.module';
import { DemandSuretyDrawerThirdStepComponent } from './demand-surety-drawer-third-step/demand-surety-drawer-third-step.component';
import { DemandSuretyDrawerFourthStepComponent } from './demand-surety-drawer-fourth-step/demand-surety-drawer-fourth-step.component';
import { DemandSuretyDrawerFifthStepComponent } from './demand-surety-drawer-fifth-step/demand-surety-drawer-fifth-step.component';

@NgModule({
  declarations: [DemandSuretyDrawerComponent, DemandSuretyDrawerSecondStepComponent, DemandSuretyDrawerThirdStepComponent, DemandSuretyDrawerFourthStepComponent, DemandSuretyDrawerFifthStepComponent],
	imports: [
		CommonModule,
		DrawerModule,
		SpacingModule,
		TabModule,
		InformationModule,
		NavbarModule,
		ButtonModule,
		InputModule,
		LabelModule,
		RightIconModule,
		IconModule,
		SelectModule,
		DropdownPointModule,
		LeftIconModule,
		TextareaModule,
		AutosizeModule,
		LinkModule,
		BadgeModule,
		ContractedFormsModule,
		MibDragAndDropModule,
		ReactiveFormsModule,
		FormsModule,
		DemandSignatureDrawerModule,
		CheckboxModule
	],
  providers: [DemandSuretyDrawerService, DemandService]
})
export class DemandSuretyDrawerModule {
}
