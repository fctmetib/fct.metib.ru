import {Component, Input} from '@angular/core';
import {SelectComponent} from '../select/select.component';

@Component({
  selector: 'mib-dropdown-point',
  templateUrl: './dropdown-point.component.html',
  styleUrls: ['./dropdown-point.component.scss']
})
export class DropdownPointComponent {
  @Input() value: any;

  constructor(
    public customSelect: SelectComponent
  ) {}

  select(): void {
    this.customSelect.selectOption(this);
  }
}
