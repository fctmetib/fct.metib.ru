import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DemandAgentDrawerComponent} from './demand-agent-drawer.component'
import {DemandAgentDrawerService} from './demand-agent-drawer.service'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {InformationModule} from 'src/app/shared/ui-kit/information/information.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {CheckboxModule} from 'src/app/shared/ui-kit/checkbox/checkbox.module'
import {TextareaModule} from 'src/app/shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {LinkModule} from 'src/app/shared/ui-kit/link/link.module'
import {BadgeModule} from 'src/app/shared/ui-kit/badge/badge.module'
import {LeftIconModule} from 'src/app/shared/directives/left-icon/left-icon.module'
import {ContractedFormsModule} from 'src/app/shared/ui-kit/contracted-forms/contracted-forms.module'
import {RightIconModule} from 'src/app/shared/directives/right-icon/right-icon.module'
import {MibDragAndDropModule} from 'src/app/shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'

@NgModule({
	declarations: [DemandAgentDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		SpacingModule,
		ButtonModule,
		TabModule,
		NavbarModule,
		InformationModule,
		InputModule,
		LabelModule,
		IconModule,
		SelectModule,
		DropdownPointModule,
		CheckboxModule,
		TextareaModule,
		AutosizeModule,
		LinkModule,
		LeftIconModule,
		BadgeModule,
		ContractedFormsModule,
		RightIconModule,
		MibDragAndDropModule,
		TagModule
	],
	providers: [DemandAgentDrawerService]
})
export class DemandAgentDrawerModule {}
