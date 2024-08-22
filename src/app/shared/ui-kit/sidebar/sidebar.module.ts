import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SidebarComponent} from './sidebar.component'
import {IconModule} from '../ref-icon/icon.module'
import {RouterLink} from '@angular/router'
import {SpacingModule} from '../spacing/spacing.module'
import {MenuPointModule} from '../menu-point/menu-point.module'
import {DropdownPointModule} from '../dropdown-point/dropdown-point.module'
// import {DropdownModule} from '../dropdown/dropdown.module'

@NgModule({
	declarations: [SidebarComponent],
	imports: [
		CommonModule,
		IconModule,
		RouterLink,
		SpacingModule,
		MenuPointModule,
		DropdownPointModule
		// DropdownModule
	],
	exports: [SidebarComponent]
})
export class SidebarModule {}
