import {AfterContentInit, AfterViewInit, Component, ContentChildren, forwardRef, QueryList} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DropdownPointComponent} from '../dropdown-point/dropdown-point.component';

@Component({
  selector: 'mib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit, AfterViewInit  {
  @ContentChildren(forwardRef(() => DropdownPointComponent)) options: QueryList<DropdownPointComponent>;

  showDropdown = false;
  selectedOption: DropdownPointComponent | null = null;
  private innerValue: any;

  onChange = (option: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.innerValue = obj;
    if (this.options && this.options.length) {
      this.updateSelectedOption();
    }
  }

  private updateSelectedOption(): void {
    this.selectedOption = this.options.find(option => option.value === this.innerValue) || null;
  }
  ngAfterViewInit(): void {
    this.updateSelectedOption();
  }

  ngAfterContentInit(): void {
    this.options.changes.subscribe(() => this.updateSelectedOption());
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: DropdownPointComponent): void {
    this.selectedOption = option;
    this.onChange(option.value);
    this.toggleDropdown();
  }
}
