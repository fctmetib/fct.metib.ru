import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SwipeTextSliderComponent} from './swipe-text-slider.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'

@NgModule({
	declarations: [SwipeTextSliderComponent],
	imports: [CommonModule, SpacingModule, ButtonModule, IconModule],
	exports: [SwipeTextSliderComponent]
})
export class SwipeTextSliderModule {}
