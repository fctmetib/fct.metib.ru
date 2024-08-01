import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TestAutocompleteComponent} from './test-autocomplete.component'

@NgModule({
	declarations: [TestAutocompleteComponent],
	imports: [CommonModule],
	exports: [TestAutocompleteComponent]
})
export class TestAutocompleteModule {}
