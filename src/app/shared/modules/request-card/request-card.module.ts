import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RequestCardComponent} from './request-card.component'
import {IconModule} from '../../ui-kit/ref-icon/icon.module'
import {LinkModule} from '../../ui-kit/link/link.module'
import {SpacingModule} from '../../ui-kit/spacing/spacing.module'
import {RightIconModule} from '../../directives/right-icon/right-icon.module'
import {RouterLink} from '@angular/router'
import {ButtonModule} from '../../ui-kit/button/button.module'

@NgModule({
	declarations: [RequestCardComponent],
	exports: [RequestCardComponent],
	imports: [
		CommonModule,
		IconModule,
		LinkModule,
		SpacingModule,
		RightIconModule,
		RouterLink,
		ButtonModule
	]
})
export class RequestCardModule {}
