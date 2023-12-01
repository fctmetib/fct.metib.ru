import {AfterContentInit, AfterViewInit, Component, ContentChildren, forwardRef, Input, QueryList} from '@angular/core';
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
export class SelectComponent implements ControlValueAccessor, AfterContentInit, AfterViewInit {
  @ContentChildren(forwardRef(() => DropdownPointComponent)) options: QueryList<DropdownPointComponent>;
  @Input() multi: boolean = false;

  private innerValue: any;

  public showDropdown = false;
  public selectedOption: DropdownPointComponent | null = null;
  public selectedOptions: DropdownPointComponent[] = [];

  /**
   * Проверяет, выбрана ли опция с заданным значением.
   * @param value Значение для проверки.
   * @returns Возвращает true, если опция выбрана, иначе false.
   */
  matchOption(value: any): boolean {
    if (this.multi) {
      // Для мульти-выбора проверяем, содержится ли значение в массиве selectedOptions
      return this.selectedOptions.some(option => option.value === value);
    } else {
      // Для одиночного выбора проверяем, совпадает ли значение с selectedOption
      return this.selectedOption && this.selectedOption.value === value;
    }
  }

  onChange = (option: any) => {
  };
  onTouched = () => {
  };

  writeValue(obj: any): void {
    this.innerValue = obj;
    if (this.options && this.options.length) {
      this.updateSelectedOption();
    }
  }

  private updateSelectedOption(): void {
    if (this.multi) {
      this.selectedOptions = this.options.filter(option => {
          const boolean = Array.isArray(this.innerValue) && this.innerValue.includes(option.value)
          option.control.setValue(boolean)
          return boolean
        }
      );
    } else {
      this.selectedOption = this.options.find(option => option.value === this.innerValue) || null;
    }
  }

  ngAfterViewInit(): void {
    this.updateSelectedOption();
  }

  ngAfterContentInit(): void {
    this.options.forEach(option => option.showCheckbox = this.multi)
    this.options.changes.subscribe(() => {
      this.updateSelectedOption()
    });
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
    if (this.multi) {
      const index = this.selectedOptions.findIndex(opt => opt.value === option.value);

      if (index === -1 && option.control.value) {
        // Если опция не выбрана и чекбокс активен, добавляем её в массив
        this.selectedOptions.push(option);
      } else if (index > -1 && !option.control.value) {
        // Если опция уже выбрана и чекбокс неактивен, удаляем её из массива
        this.selectedOptions.splice(index, 1);
      }

      this.onChange(this.selectedOptions.map(opt => opt.value));
    } else {
      this.selectedOption = option;
      this.onChange(option.value);
      this.toggleDropdown();
    }
  }

}
