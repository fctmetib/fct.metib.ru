import {
  AfterContentInit,
  AfterViewInit,
  Component, ContentChild,
  ContentChildren,
  ElementRef,
  forwardRef, Inject,
  Input, PLATFORM_ID,
  QueryList, Renderer2,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DropdownPointComponent} from '../dropdown-point/dropdown-point.component';
import {InputSize} from '../input/interfaces/input.interface';
import {SelectType} from './interfaces/select.interface';
import {setPaddings} from '../input/services/set-paddings.service';
import {DropdownService} from '../dropdown/services/dropdown.service';
import {DropdownComponent} from '../dropdown/dropdown.component';
import {SelectLabelDirective} from './directives/select-label.directive';
import {isPlatformBrowser} from '@angular/common';

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
  @ViewChild(DropdownComponent) menu: DropdownComponent
  @ViewChild('select') select: ElementRef<HTMLDivElement>
  @ViewChild('leftIcon') leftIcon: ElementRef<HTMLDivElement>
  @ViewChild('rightIcon') rightIcon: ElementRef<HTMLDivElement>
  @ContentChildren(forwardRef(() => DropdownPointComponent)) options: QueryList<DropdownPointComponent>;
  @ContentChild(SelectLabelDirective) label: SelectLabelDirective
  @Input() multi: boolean = false;
  @Input() placeholder: string = 'Выберите опцию'
  @Input() size: InputSize = 'm';
  @Input() type: SelectType = 'filled-secondary';

  private innerValue: any;
  private viewMounted: boolean = false;

  public selectedOption: DropdownPointComponent | null = null;
  public selectedOptions: DropdownPointComponent[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private r2: Renderer2,
    private dropdownService: DropdownService
  ) {
  }

  get showDropdown() {
    const menuId = this.menu?.id
    if (menuId) {
      return this.dropdownService.isMenuOpened(menuId)
    }
    return false
  }

  get classes() {
    return {
      [`select_${this.size}`]: true,
      [`select_type-${this.type}`]: true,
      'select_right-iconly': this.rightIcon?.nativeElement?.children?.length,
      'select_left-iconly': this.leftIcon?.nativeElement?.children?.length,
      'select-transition': this.viewMounted,
    }
  }

  setIconPaddings() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        setPaddings({
          leftEl: this.leftIcon.nativeElement,
          rightEl: this.rightIcon.nativeElement,
          element: this.select.nativeElement,
        }, this.r2)
      })
    }
  }

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
    this.setIconPaddings()
    this.updateSelectedOption();

    this.viewMounted = true
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

  close(): void {
    this.dropdownService.closeMenu()
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
      this.close();
    }
  }

}
