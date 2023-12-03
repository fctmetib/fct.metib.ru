import {AfterViewInit, Component, ElementRef, Input, Optional, TemplateRef, ViewChild} from '@angular/core';
import {SelectComponent} from '../select/select.component';
import {DropdownPointSize, DropdownPointType} from './interfaces/dropdown-point.interface';
import {FormControl} from '@angular/forms';
import {DropdownService} from '../dropdown/services/dropdown.service';

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
  @Input() set showCheckbox(value: boolean) {
    this._showCheckbox =value
  }
  @Input() size: DropdownPointSize = 'm'
  @Input() type: DropdownPointType = 'outline'

  public viewMounted: boolean = false;
  public control: FormControl = new FormControl<boolean>(false)
  public _showCheckbox: boolean = false

  constructor(
    private dropdownService: DropdownService,
    @Optional() public selectComponent?: SelectComponent,
  ) {
  }

  get selected() {
    return this.selectComponent?.matchOption(this.value)
  }

  select(): void {
    if (this._showCheckbox) this.control.setValue(!this.control.value)
    this.selectComponent?.selectOption(this);
    if (!this.selectComponent) {
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
