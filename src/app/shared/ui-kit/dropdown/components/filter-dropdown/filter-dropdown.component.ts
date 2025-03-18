import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../dropdown.component';
import { InputModule } from '../../../input/input.module';
import { LabelModule } from '../../../../directives/label/label.module';
import { PaginatorModule } from 'primeng/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../../../ref-icon/icon.module';
import { LeftIconModule } from '../../../../directives/left-icon/left-icon.module';
import { LinkModule } from '../../../link/link.module';
import { DropdownService } from '../../services/dropdown.service';
import { ButtonModule } from '../../../button/button.module';
import { RightIconModule } from '../../../../directives/right-icon/right-icon.module';

@Component({
  selector: 'mib-filter-dropdown',
  standalone: true,
  imports: [CommonModule, InputModule, LabelModule, PaginatorModule, ReactiveFormsModule, IconModule, LeftIconModule, LinkModule, ButtonModule, RightIconModule],
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss']
})
export class FilterDropdownComponent extends DropdownComponent {

  @Output() onApply = new EventEmitter<string[]>()
  @Output() onCancel = new EventEmitter()

  dropdownService = inject(DropdownService)

  searchControl = new FormControl('')
  values = []

  get isValuesExists() {
    return Boolean(this.values.length)
  }

  selectOption(value: any) {
    const index = this.values.findIndex(x => x === value)
    if (index+1) {
      this.values.splice(index, 1);
    } else {
      this.values.push(value)
    }
  }

  matchOption(value: any) {
    return this.values.includes(value)
  }

  resetValue() {
    this.values = []
  }

  cancel() {
    this.resetValue()
    this.dropdownService.closeMenu()
    this.onCancel.emit()
  }

  apply() {
    this.onApply.emit(this.values)
    this.dropdownService.closeMenu()
  }

  clearInput() {
    this.searchControl.reset('')
  }
}
