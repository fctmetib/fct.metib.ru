import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MobileTablePopupComponent} from './mobile-table-popup.component'
import {MobileTablePopupCellComponent} from './components/mobile-table-popup-cell/mobile-table-popup-cell.component'
import {SpacingModule} from '../spacing/spacing.module'
import {IconModule} from '../ref-icon/icon.module'
import {LinkModule} from '../link/link.module'
import {RightIconModule} from '../../directives/right-icon/right-icon.module'

@NgModule({
	declarations: [MobileTablePopupComponent, MobileTablePopupCellComponent],
	imports: [
		CommonModule,
		SpacingModule,
		IconModule,
		LinkModule,
		RightIconModule
	],
	exports: [MobileTablePopupComponent, MobileTablePopupCellComponent]
})
export class MobileTablePopupModule {}
