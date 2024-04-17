import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	forwardRef,
	HostListener,
	Input,
	OnDestroy,
	Output,
	QueryList
} from '@angular/core'
import {TableCellSize} from './components/table-cell/interfaces/table-cell.interface'
import {TableRowComponent} from './components/table-row/table-row.component'
import {TableHeadCellComponent} from './components/table-head-cell/table-head-cell.component'
import {forkJoin, Subject, switchMap, tap} from 'rxjs'
import {startWith, takeUntil} from 'rxjs/operators'
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service'
import {TableCellComponent} from './components/table-cell/table-cell.component'
import {TableSelectionEvent} from './interfaces/table.interface'

@Component({
	selector: 'mib-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	providers: [AutoUnsubscribeService]
})
export class TableComponent implements AfterContentInit, OnDestroy {
	@ContentChildren(forwardRef(() => TableRowComponent))
	rows: QueryList<TableRowComponent>
	@ContentChildren(forwardRef(() => TableHeadCellComponent), {
		descendants: true
	})
	headCells: QueryList<TableHeadCellComponent>
	@ContentChildren(forwardRef(() => TableCellComponent), {descendants: true})
	cells: QueryList<TableCellComponent>

	@Input() set size(value: TableCellSize) {
		this._size = value
	}

	@Input() set isLoading(value: boolean) {
		this._isLoading = value
		if (!this._isLoading) {
			this.selectFirstColumn()
		}
	}

	@Output() selectionChange = new EventEmitter<TableSelectionEvent>()

	private unsubscribe$ = new Subject<void>()
	public selectedHeadCell?: TableHeadCellComponent
	public _isLoading: boolean = false
	public _size: TableCellSize = 'm'

	lastCheckedIndex: number | null = null
	shiftKeyHeldDown = false

	constructor(private au: AutoUnsubscribeService) {}

	get selectedRows() {
		return this.rows
			.toArray()
			.filter(
				row =>
					row.state && row?.cell?.showCheckbox && row?.cell?.type === 'main'
			)
	}

	ngAfterContentInit() {
		const headCell = this.headCells.get(0)
		headCell.control.valueChanges
			.pipe(
				tap(value => {
					this.rows.forEach(row => {
						const cell = row.cells.get(0)
						cell.control.setValue(value)
					})
					this.emit()
				}),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
	}

	ngOnDestroy() {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	selectFirstColumn() {
		const cell = this.headCells.find(cell => cell.sortable)
		cell?.setSelectedValue(false)
	}

	selectHeadCell(component: TableHeadCellComponent) {
		this.selectedHeadCell = component
		this.headCells.forEach((cell, index) => {
			cell.selectedAsSortable = cell.id === component.id
		})
	}

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (event.key === 'Shift') {
			this.shiftKeyHeldDown = true
		}
	}

	@HostListener('document:keyup', ['$event'])
	handleKeyUp(event: KeyboardEvent) {
		if (event.key === 'Shift') {
			this.shiftKeyHeldDown = false
		}
	}

	getIndexById(rowId) {
		return this.rows.toArray().findIndex(row => row.rowId === rowId)
	}

	onCheckboxClick(rowId, value: boolean, rowStatus: string) {
		console.log('rowStatus :>> ', rowStatus)
		const index = this.getIndexById(rowId)
		if (this.shiftKeyHeldDown && this.lastCheckedIndex !== null) {
			const start = Math.min(this.lastCheckedIndex, index)
			const end = Math.max(this.lastCheckedIndex, index)
			for (let i = start; i <= end; i++) {
				// Здесь должен быть код для выделения строки, например:
				this.rows.get(i)?.cell?.control?.setValue?.(value)
				this.rows.get(i)?.cell?.control?.setValue?.(rowStatus)
			}
		}
		if (!this.shiftKeyHeldDown) this.lastCheckedIndex = index
		this.emit()
	}

	emit() {
		const selectedRows = this.rows.toArray().filter(row => row.state)
		this.selectionChange.emit({
			selectedCount: selectedRows.length,
			selectedIds: selectedRows.map(row => row.rowId)
		})
	}

	deselect() {
		this.headCells.get(0).control.setValue(false)
		this.selectionChange.emit({
			selectedCount: 0,
			selectedIds: []
		})
	}
}
