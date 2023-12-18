import {AfterContentInit, Component, ContentChildren, HostListener, Input, QueryList} from '@angular/core';
import {TableCellSize} from './components/table-cell/interfaces/table-cell.interface';
import {TableRowComponent} from './components/table-row/table-row.component';
import {TableHeadCellComponent} from './components/table-head-cell/table-head-cell.component';
import {forkJoin, tap} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service';

@Component({
  selector: 'mib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class TableComponent implements AfterContentInit {

  @ContentChildren(TableRowComponent) rows: QueryList<TableRowComponent>
  @ContentChildren(TableHeadCellComponent, {descendants: true}) headCells: QueryList<TableHeadCellComponent>

  @Input() set size(value: TableCellSize) {
    this._size = value;
  }

  @Input() set isLoading(value: boolean) {
    this._isLoading = value;
    if (!this._isLoading) {
      this.toggleFirstColumn()
    }
  }

  public selectedHeadCell?: TableHeadCellComponent
  public _isLoading: boolean = false;
  public _size: TableCellSize = 'm'

  lastCheckedIndex: number | null = null;
  shiftKeyHeldDown = false;

  constructor(
    private au: AutoUnsubscribeService
  ) {
  }

  ngAfterContentInit() {
    const headCell = this.headCells.get(0);
    headCell.control.valueChanges.pipe(
      tap(value => {
        this.rows.forEach(row => {
          const cell = row.cells.get(0);
          cell.control.setValue(value)
        })
      })
    ).subscribe()
  }

  toggleFirstColumn() {
    const cell = this.headCells.find(cell => cell.sortable);
    cell?.toggle()
  }

  selectHeadCell(component: TableHeadCellComponent) {
    this.selectedHeadCell = component
    const cellsTriggers$ = []
    this.headCells.forEach((cell, index) => {
      cell.selectedAsSortable = cell.id === component.id
      cellsTriggers$.push(cell.onCheck.pipe(tap(value => {
        if (value) this.onCheckboxClick(index)
      })))
    })
    forkJoin(cellsTriggers$).pipe(
      takeUntil(this.au.destroyer)
    ).subscribe()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Shift') {
      this.shiftKeyHeldDown = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Shift') {
      this.shiftKeyHeldDown = false;
    }
  }

  onCheckboxClick(index) {
    console.log('this.shiftKeyHeldDown', this.shiftKeyHeldDown)
    if (this.shiftKeyHeldDown && this.lastCheckedIndex !== null) {
      const start = Math.min(this.lastCheckedIndex, index);
      const end = Math.max(this.lastCheckedIndex, index);
      for (let i = start; i <= end; i++) {
        // Здесь должен быть код для выделения строки, например:
        // this.rows[i].selected = event.target.checked;
      }
    } else {
      // Здесь код для обработки одиночного клика
      // this.rows[index].selected = event.target.checked;
    }
    this.lastCheckedIndex = index; // Обновляем индекс последнего выделенного элемента
  }
}
