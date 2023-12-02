import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownPointComponent} from './dropdown-point.component';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DropdownPointComponent
  ],
  exports: [
    DropdownPointComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    ReactiveFormsModule
  ]
})
export class DropdownPointModule {
}
