import {
  AfterContentInit, AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren, ElementRef,
  forwardRef,
  Input,
  QueryList, Renderer2, ViewChild,
} from '@angular/core';
import {MibInputDirective} from '../input/directives/mib-input.directive';
import {DropdownPointComponent} from '../dropdown-point/dropdown-point.component';
import {DropdownService} from '../dropdown/services/dropdown.service';
import {fromEvent, tap} from 'rxjs';
import {DropdownComponent} from '../dropdown/dropdown.component';
import {DropdownDirective} from '../dropdown/directives/dropdown.directive';

@Component({
  selector: 'mib-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements AfterContentInit, AfterViewInit {
  @ViewChild('menu') menu: DropdownComponent
  @ViewChild(DropdownDirective, {read: ElementRef}) dropdownElement: ElementRef
  @ContentChild(MibInputDirective) inputDirective!: MibInputDirective;
  @ContentChildren(forwardRef(() => DropdownPointComponent)) options: QueryList<DropdownPointComponent>;
  @Input() multi: boolean = false;

  public selectedOption: DropdownPointComponent | null = null;
  public selectedOptions: DropdownPointComponent[] = [];
  private innerValue: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private dropdownService: DropdownService
  ) {
  }

  get control() {
    return this.inputDirective.control ?? null
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    this.innerValue = this.inputDirective.control.value
    fromEvent(this.inputDirective.elementRef.nativeElement, 'input').pipe(
      tap(() => {
        this.dropdownService.toggleMenu(this.menu, this.dropdownElement.nativeElement)
      })
    ).subscribe()
    this.updateSelectedOption();
  }

  matchOption(value: any): boolean {
    if (this.multi) {
      // Для мульти-выбора проверяем, содержится ли значение в массиве selectedOptions
      return this.selectedOptions.some(option => option.value === value);
    } else {
      // Для одиночного выбора проверяем, совпадает ли значение с selectedOption
      return this.selectedOption && this.selectedOption.value === value;
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
      if (this.inputDirective) {
        this.inputDirective.elementRef.nativeElement.value = this.selectedOption?.text ?? ''
        this.cdr.detectChanges()
      }
    }
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

      this.control.setValue(this.selectedOptions.map(opt => opt.value));
    } else {
      this.selectedOption = option;
      this.control.setValue(option.value);
      this.close();
    }
    if (this.inputDirective) {
      this.inputDirective.elementRef.nativeElement.value = option.text
      this.cdr.detectChanges()
    }
  }

  close(): void {
    this.dropdownService.closeMenu()
  }

}
