import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CashPanelComponent } from './cash-panel.component'
import { IconModule } from '../../ui-kit/ref-icon/icon.module'
import { SpacingModule } from '../../ui-kit/spacing/spacing.module'
import { LinkModule } from '../../ui-kit/link/link.module'
import { RightIconModule } from '../../directives/right-icon/right-icon.module'
import { RouterLink } from '@angular/router'

@NgModule({
	declarations: [CashPanelComponent],
	exports: [CashPanelComponent],
	imports: [
		CommonModule,
		IconModule,
		SpacingModule,
		LinkModule,
		RightIconModule,
		RouterLink
	]
})
export class CashPanelModule {}
