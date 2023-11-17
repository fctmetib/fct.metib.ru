import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputComponent } from './input.component'
import { RefIconModule } from '../ref-icon/ref-icon.module'
import { MetibInputDirective } from './directives/metib-input.directive'
import { AutocompleteComponent } from './components/autocomplete.component'

@NgModule({
	imports: [CommonModule, RefIconModule],
	declarations: [InputComponent, MetibInputDirective, AutocompleteComponent],
  exports: [InputComponent, MetibInputDirective]
})
export class InputModule {}
