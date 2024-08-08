import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TestModalOutsideComponent} from './test-modal-outside.component'

@NgModule({
	declarations: [TestModalOutsideComponent],
	imports: [CommonModule],
	exports: [TestModalOutsideComponent]
})
export class TestModalOutsideModule {}
