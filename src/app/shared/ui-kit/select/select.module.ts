import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select.component';
import {DropdownModule} from '../dropdown/dropdown.module';
import {RefIconModule} from '../ref-icon/ref-icon.module';
import {SpacingModule} from '../spacing/spacing.module';
import {DropdownPointModule} from '../dropdown-point/dropdown-point.module';
import {SelectLabelDirective} from './directives/select-label.directive';


@NgModule({
  declarations: [SelectComponent, SelectLabelDirective],
  imports: [CommonModule, DropdownModule, RefIconModule, SpacingModule, DropdownPointModule],
  exports: [SelectComponent, SelectLabelDirective],
})
export class SelectModule {
}
