import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TestTabComponent} from './test-tab.component'
import {IconModule} from '../ref-icon/icon.module'
import {ButtonModule} from '../button/button.module'

@NgModule({
	declarations: [TestTabComponent],
	imports: [CommonModule, IconModule, ButtonModule],
	exports: [TestTabComponent]
})
export class TestTabModule {}
