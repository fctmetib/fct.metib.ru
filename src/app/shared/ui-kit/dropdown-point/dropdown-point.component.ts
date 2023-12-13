import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Optional, Output, TemplateRef, ViewChild} from '@angular/core';
import {SelectComponent} from '../select/select.component';
import {DropdownPointSize, DropdownPointType} from './interfaces/dropdown-point.interface';
import {FormControl} from '@angular/forms';
import {DropdownService} from '../dropdown/services/dropdown.service';
import {AutoCompleteComponent} from '../auto-complete/auto-complete.component';

@Component({
  selector: 'mib-dropdown-point',
  templateUrl: './dropdown-point.component.html',
  styleUrls: ['./dropdown-point.component.scss']
})
export class DropdownPointComponent implements AfterViewInit {

  @ViewChild('leftIcon') leftIcon?: ElementRef<HTMLDivElement>
  @ViewChild('rightIcon') rightIcon?: ElementRef<HTMLDivElement>

  @Input() value: any;
  @Input() underlined: boolean = false;
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() set showCheckbox(value: boolean) {
    this._showCheckbox =value
  }
  @Input() size: DropdownPointSize = 'm'
  @Input() type: DropdownPointType = 'outline'
  @Output() press = new EventEmitter()

  public viewMounted: boolean = false;
  public control: FormControl = new FormControl<boolean>(false)
  public _showCheckbox: boolean = false

  constructor(
    private dropdownService: DropdownService,
    @Optional() public selectComponent?: SelectComponent,
    @Optional() public autoCompleteComponent?: AutoCompleteComponent,
  ) {
  }

  get selected() {
    return this.selectComponent?.matchOption(this.value)
  }

  select(): void {
    this.press.emit()
    if (this._showCheckbox) this.control.setValue(!this.control.value)
    this.selectComponent?.selectOption(this);
    this.autoCompleteComponent?.selectOption(this)
    if (!this.selectComponent && !this.autoCompleteComponent) {
      this.dropdownService.closeMenu()
    }
  }

  ngAfterViewInit() {
    this.viewMounted = true;
  }

  get classes() {
    return {
      'dropdown-point_underlined': this.underlined,
      'dropdown-point_selected': this.selected,
      'dropdown-point-transition': this.viewMounted,
      [`dropdown-point_${this.size}`]: true,
      [`dropdown-point_type-${this.type}`]: true,
      [`dropdown-point_left-iconly`]: this.leftIcon?.nativeElement?.children?.length,
      [`dropdown-point_right-iconly`]: this.rightIcon?.nativeElement?.children?.length,
    }
  }
}
