import {AfterContentInit, Component, ContentChildren, HostListener, Input, OnDestroy, QueryList} from '@angular/core';
import {TableCellSize} from './components/table-cell/interfaces/table-cell.interface';
import {TableRowComponent} from './components/table-row/table-row.component';
import {TableHeadCellComponent} from './components/table-head-cell/table-head-cell.component';
import {forkJoin, Subject, switchMap, tap} from 'rxjs';
import {startWith, takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service';
import {TableCellComponent} from './components/table-cell/table-cell.component';

@Component({
  selector: 'mib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class TableComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(TableRowComponent) rows: QueryList<TableRowComponent>
  @ContentChildren(TableHeadCellComponent, {descendants: true}) headCells: QueryList<TableHeadCellComponent>
  @ContentChildren(TableCellComponent, {descendants: true}) cells: QueryList<TableCellComponent>

  @Input() set size(value: TableCellSize) {
    this._size = value;
  }

  @Input() set isLoading(value: boolean) {
    this._isLoading = value;
    if (!this._isLoading) {
      this.selectFirstColumn()
    }
  }
  private unsubscribe$ = new Subject<void>();
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

    this.cells.changes.pipe(
      startWith(null),
      switchMap(() => {
        this.unsubscribe$.next();

        const cellsTriggers$ = this.cells.map((cell, index) =>
          cell.onCheck.pipe(
            tap(value => {
              this.onCheckboxClick(index, value);
            }),
            takeUntil(this.unsubscribe$)
          )
        );
        return forkJoin(cellsTriggers$);
      }),
      takeUntil(this.au.destroyer)
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectFirstColumn() {
    const cell = this.headCells.find(cell => cell.sortable);
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
      this.shiftKeyHeldDown = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Shift') {
      this.shiftKeyHeldDown = false;
    }
  }

  onCheckboxClick(index, value: boolean) {
    console.log('this.shiftKeyHeldDown', this.shiftKeyHeldDown, 'lastCheckedIndex', this.lastCheckedIndex)
    if (this.shiftKeyHeldDown && this.lastCheckedIndex !== null) {
      const start = Math.min(this.lastCheckedIndex, index);
      const end = Math.max(this.lastCheckedIndex, index);
      for (let i = start; i <= end; i++) {
        // Здесь должен быть код для выделения строки, например:
        this.cells.get(i).control.setValue(value);
      }
    } else {
      // Здесь код для обработки одиночного клика
      // this.rows[index].selected = event.target.checked;
    }
    if (!this.shiftKeyHeldDown) this.lastCheckedIndex = index;
  }
}
