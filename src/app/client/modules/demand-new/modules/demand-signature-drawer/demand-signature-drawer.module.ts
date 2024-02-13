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

@NgModule({
	declarations: [DemandSignatureDrawerComponent],
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
		MibDragAndDropModule
	],
	providers: [DemandSignatureDrawerService]
})
export class DemandSignatureDrawerModule {}
