import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select.component';
import {DropdownModule} from '../dropdown/dropdown.module';


@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, DropdownModule],
  exports: [SelectComponent],
})
export class SelectModule {
}
