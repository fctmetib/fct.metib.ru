import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandEditingDrawerComponent} from './demand-editing-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

/* TO-DO

--------------
CHECK PROVIDERS!!!!!
--------------
*/

@NgModule({
	declarations: [DemandEditingDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule]
})
export class DemandEditingDrawerModule {}
