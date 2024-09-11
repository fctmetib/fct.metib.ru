import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownComponent} from './dropdown.component';
import {DropdownDirective} from './directives/dropdown.directive';
import {DropdownService} from './services/dropdown.service';


@NgModule({
  declarations: [
    DropdownComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownComponent,
    DropdownDirective
  ],
  providers: [
    DropdownService
  ]
})
export class DropdownModule {
}
