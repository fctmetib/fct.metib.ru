import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TestAutocompleteComponent} from './test-autocomplete.component'
import {InputModule} from '../input/input.module'
import {ReactiveFormsModule} from '@angular/forms'
import {DropdownModule} from '../dropdown/dropdown.module'
import {DropdownPointModule} from '../dropdown-point/dropdown-point.module'

@NgModule({
	declarations: [TestAutocompleteComponent],
	imports: [
		CommonModule,
		InputModule,
		ReactiveFormsModule,
		DropdownModule,
		DropdownPointModule
	],
	exports: [TestAutocompleteComponent]
})
export class TestAutocompleteModule {}
