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

/* TO-DO

--------------
CHECK PROVIDERS!!!!!
--------------
*/

@NgModule({
	declarations: [DemandSuretyDrawerComponent],
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
		DropdownPointModule
	]
})
export class DemandSuretyDrawerModule {}
