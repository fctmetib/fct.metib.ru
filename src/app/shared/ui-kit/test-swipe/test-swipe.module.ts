import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TestSwipeComponent} from './test-swipe.component'
import {HammerModule} from '@angular/platform-browser'

@NgModule({
	declarations: [TestSwipeComponent],
	imports: [CommonModule, HammerModule],
	exports: [TestSwipeComponent]
})
export class TestSwipeModule {}
