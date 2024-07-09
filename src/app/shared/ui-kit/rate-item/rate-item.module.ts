import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SpacingModule} from '../spacing/spacing.module'
import {IconModule} from '../ref-icon/icon.module'
import {RateItemComponent} from './rate-item.component'
import {ButtonModule} from '../button/button.module'

@NgModule({
	declarations: [RateItemComponent],
	imports: [CommonModule, SpacingModule, ButtonModule, IconModule],
	exports: [RateItemComponent]
})
export class RateItemModule {}
