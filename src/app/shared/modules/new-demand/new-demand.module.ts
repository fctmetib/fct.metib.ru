import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NewDemandComponent } from './new-demand.component'
import { RefIconModule } from '../../ui-kit/ref-icon/ref-icon.module'
import { LinkModule } from '../../ui-kit/link/link.module'
import { SpacingModule } from '../../ui-kit/spacing/spacing.module'
import { RightIconModule } from '../../directives/right-icon/right-icon.module'
import { RouterLink } from '@angular/router'

@NgModule({
	declarations: [NewDemandComponent],
	exports: [NewDemandComponent],
	imports: [
		CommonModule,
		RefIconModule,
		LinkModule,
		SpacingModule,
		RightIconModule,
		RouterLink
	]
})
export class NewDemandModule {}
