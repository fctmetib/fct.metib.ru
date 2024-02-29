import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewDelaysDrawerComponent} from './new-delays-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {NewDelaysDrawerService} from './new-delays-drawer.service'

@NgModule({
	declarations: [NewDelaysDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [NewDelaysDrawerService]
})
export class NewDelaysDrawerModule {}
