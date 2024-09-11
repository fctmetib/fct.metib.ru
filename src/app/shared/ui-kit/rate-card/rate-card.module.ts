import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RateCardComponent} from './rate-card.component'
import {SpacingModule} from '../spacing/spacing.module'
import {ButtonModule} from '../button/button.module'
import {IconModule} from '../ref-icon/icon.module'
import {MarkModule} from '../mark/mark.module'

@NgModule({
	declarations: [RateCardComponent],
	imports: [CommonModule, SpacingModule, ButtonModule, IconModule, MarkModule],
	exports: [RateCardComponent]
})
export class RateCardModule {}
