import {
	Component,
	ContentChildren,
	EventEmitter,
	HostBinding,
	Input,
	OnChanges,
	OnInit,
	Output,
	QueryList,
	SimpleChanges
} from '@angular/core'
import {TableCellSize, TableCellType} from './interfaces/table-cell.interface'
import {FormControl} from '@angular/forms'
import {tap} from 'rxjs'
import {TableComponent} from '../../table.component'
import {distinctUntilChanged} from 'rxjs/operators'
import {TableRowComponent} from '../table-row/table-row.component'

@Component({
	selector: 'mib-table-cell',
	templateUrl: './table-cell.component.html',
	styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit, OnChanges {
	@Input() set size(value: TableCellSize) {
		this._size = value
	}
	@Input() type: TableCellType = 'text'
	@Input() checked: boolean
	@Input() showCheckbox: boolean = true
	@Input() contracted: boolean = false
	@Output() onCheck = new EventEmitter<boolean>()
	@Output() press = new EventEmitter<any>()
	@HostBinding('title') @Input() title: string = ''

	public _size: TableCellSize = 's'
	public checkboxId: string

	control: FormControl = new FormControl<boolean>(false)

	constructor(private table: TableComponent, private row: TableRowComponent) {}

	get state() {
		return Boolean(this.control?.value)
	}

	get rowStatus() {
		return ''
	}

	@HostBinding('class')
	get classes() {
		return {
			[`table-cell_type-${this.type}`]: true,
			[`table-cell_size-${this._size}`]: true
		}
	}

	toggle() {
		this.control.setValue(!this.control.value)
		this.handleCheckboxClick()
	}

	ngOnInit() {
		this.checkboxId = 'checkbox-' + Math.random().toString(36).substr(2, 9)

		this.control.valueChanges
			.pipe(
				distinctUntilChanged(),
				tap(value => {
					this.onCheck.emit(value)
				})
			)
			.subscribe()
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.checked) {
			this.control.setValue(this.checked, {emitEvent: false})
		}
	}

	handleCheckboxClick() {
		setTimeout(() => {
			if (
				this.type === 'main' &&
				!(this.row.rowStatus === 'Добавлена в заявку')
			) {
				this.table.onCheckboxClick(
					this.row.rowId,
					this.state,
					this.row.rowStatus
				)
			} else if (
				this.type === 'main' &&
				this.row.rowStatus === 'Добавлена в заявку'
			) {
				this.checked = false
				this.control.setValue(this.checked, {emitEvent: false})
				return
			}
		})
	}
}
