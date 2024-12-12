import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, inject,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {SelectComponent} from '../select/select.component'
import {
	DropdownPointSize,
	DropdownPointType
} from './interfaces/dropdown-point.interface'
import {FormControl} from '@angular/forms'
import {DropdownService} from '../dropdown/services/dropdown.service'
import {AutoCompleteComponent} from '../auto-complete/auto-complete.component'
import { TableHeadCellComponent } from '../table/components/table-head-cell/table-head-cell.component';

@Component({
	selector: 'mib-dropdown-point',
	templateUrl: './dropdown-point.component.html',
	styleUrls: ['./dropdown-point.component.scss']
})
export class DropdownPointComponent implements AfterViewInit {
	@ViewChild('leftIcon') leftIcon?: ElementRef<HTMLDivElement>
	@ViewChild('rightIcon') rightIcon?: ElementRef<HTMLDivElement>

	@Input() value: any
	@Input() underlined: boolean = false
	@Input() danger: boolean = false
	@Input() text: string = ''
	@Input() disabled: boolean = false
	@Input() set showCheckbox(value: boolean) {
		this._showCheckbox = value
	}
	@Input() size: DropdownPointSize = 'm'
	@Input() type: DropdownPointType = 'outline'
	@Output() press = new EventEmitter()

	viewMounted: boolean = false
	control = new FormControl<boolean>(false)
	_showCheckbox: boolean = false

  private dropdownService = inject(DropdownService)
  selectComponent = inject(SelectComponent, {optional: true})
  autoCompleteComponent = inject(AutoCompleteComponent, {optional: true})
  tableHeadCellComponent = inject(TableHeadCellComponent, {optional: true})

  get filterDropdown() {
    return this.tableHeadCellComponent?.filterActionComponent?.filterDropdown
  }

	get isVisible() {
		if (this.autoCompleteComponent) {
			return this.autoCompleteComponent.getVisibleState(this.value)
		} else if (this.filterDropdown) {
      return this.value.toLowerCase().includes(this.filterDropdown.searchControl.value.toLowerCase())
    }
		return true
	}

	get selected() {
    const component = this.selectComponent || this.autoCompleteComponent || this.filterDropdown
		return component?.matchOption(this.value)
	}

	select($event: Event): void {
		$event.stopPropagation()
		$event.preventDefault()
		this.press.emit()
		if (this._showCheckbox) this.control.setValue(!this.control.value)
		this.selectComponent?.selectOption(this)
		this.autoCompleteComponent?.selectOption(this)
    this.filterDropdown?.selectOption(this.value)
		if (!this.selectComponent && !this.autoCompleteComponent && !this.filterDropdown) {
			this.dropdownService.closeMenu()
		}
	}

	ngAfterViewInit() {
		this.viewMounted = true
	}

	get classes() {
		return {
			'dropdown-point_underlined': this.underlined,
			'dropdown-point_danger': this.danger,
			'dropdown-point_selected': this.selected,
			'dropdown-point-transition': this.viewMounted,
			[`dropdown-point_${this.size}`]: true,
			[`dropdown-point_type-${this.type}`]: true,
			[`dropdown-point_left-iconly`]:
				this.leftIcon?.nativeElement?.children?.length,
			[`dropdown-point_right-iconly`]:
				this.rightIcon?.nativeElement?.children?.length
		}
	}
}
