import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TestTabComponent} from './test-tab.component'

@NgModule({
	declarations: [TestTabComponent],
	imports: [CommonModule],
	exports: [TestTabComponent]
})
export class TestTabModule {}
