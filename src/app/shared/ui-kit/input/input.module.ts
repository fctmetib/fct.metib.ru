import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {InputComponent} from './input.component'
import {RefIconModule} from '../ref-icon/ref-icon.module'
import {MibInputDirective} from './directives/mib-input.directive'
import {AutocompleteComponent} from './components/autocomplete.component'

@NgModule({
  imports: [CommonModule, RefIconModule],
  declarations: [InputComponent, MibInputDirective, AutocompleteComponent],
  exports: [InputComponent, MibInputDirective],
})
export class InputModule {
}
