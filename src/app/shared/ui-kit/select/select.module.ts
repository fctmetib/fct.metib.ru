import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select.component';
import {DropdownModule} from '../dropdown/dropdown.module';
import {RefIconModule} from '../ref-icon/ref-icon.module';


@NgModule({
  declarations: [SelectComponent],
    imports: [CommonModule, DropdownModule, RefIconModule],
  exports: [SelectComponent],
})
export class SelectModule {
}
