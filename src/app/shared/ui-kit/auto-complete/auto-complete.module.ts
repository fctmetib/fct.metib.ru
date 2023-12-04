import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCompleteComponent} from './auto-complete.component';
import {InputModule} from '../input/input.module';
import {DropdownModule} from '../dropdown/dropdown.module';
import {DropdownPointModule} from '../dropdown-point/dropdown-point.module';
import {RefIconModule} from '../ref-icon/ref-icon.module';
import {SpacingModule} from '../spacing/spacing.module';


@NgModule({
  declarations: [
    AutoCompleteComponent
  ],
  exports: [
    AutoCompleteComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    DropdownModule,
    DropdownPointModule,
    RefIconModule,
    SpacingModule
  ]
})
export class AutoCompleteModule {
}
