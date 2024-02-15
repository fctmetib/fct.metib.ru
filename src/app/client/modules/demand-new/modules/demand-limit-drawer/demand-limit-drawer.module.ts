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
		ButtonModule
	],
	providers: [DemandLimitDrawerService]
})
export class DemandLimitDrawerModule {}
