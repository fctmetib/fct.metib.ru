import {
  AfterViewInit, ChangeDetectorRef,
  Component, ContentChild,
  ContentChildren,
  EventEmitter,
  forwardRef,
  HostListener, inject,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import { TableCellSize } from './components/table-cell/interfaces/table-cell.interface';
import { TableRowComponent } from './components/table-row/table-row.component';
import { TableHeadCellComponent } from './components/table-head-cell/table-head-cell.component';
import { BehaviorSubject, EMPTY, filter, forkJoin, Subject, switchMap, tap } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableSelectionEvent } from './interfaces/table.interface';
import { TableHeadComponent } from './components/table-head/table-head.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TableCellBaseComponent } from './components/table-cell-base/table-cell-base.component';

@UntilDestroy()
@Component({
  selector: 'mib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T = any> implements AfterViewInit, OnDestroy {
  @ContentChildren(forwardRef(() => TableRowComponent))
  rows: QueryList<TableRowComponent>;
  @ContentChildren(forwardRef(() => TableHeadCellComponent), {
    descendants: true
  })
  headCells: QueryList<TableHeadCellComponent>;
  @ContentChildren(forwardRef(() => TableCellComponent), { descendants: true })
  cells: QueryList<TableCellComponent>;

  @ContentChild(TableHeadComponent) tableHead: TableHeadComponent

  @Input() showCheckbox: boolean = true;

  @Input() set size(value: TableCellSize) {
    this._size = value;
  }

  @Input() set isLoading(value: boolean) {
    this._isLoading = value;
  }

  @Input()
  set data(data: T[]) {
    this.rendererData = [...data]
    this._data$.next([...data]);
  }

  get data() {
    return this._data$.value
  }

  get data$() {
    return this._data$.asObservable()
  }

  set rendererData(data: T[]) {
    this._rendererData =  data
  }

  get rendererData() {
    return this._rendererData;
  }

  @Output() selectionChange = new EventEmitter<TableSelectionEvent>();

  private _data$ = new BehaviorSubject<T[]>([]);
  private _rendererData: T[] = [];
  private unsubscribe$ = new Subject<void>();
  public _isLoading: boolean = false;
  public _size: TableCellSize = 'm';

  lastCheckedIndex: number | null = null;
  shiftKeyHeldDown = false;

  private cdr = inject(ChangeDetectorRef)

  get selectedRows() {
    return (this.rows?.toArray() ?? []).filter(row => row.state && row?.cell?.isCheckboxDisplayed);
  }

  ngAfterViewInit() {
    if (this.showCheckbox) {
      this.headCells.changes.pipe(
        startWith(this.headCells),
        tap(() => {
          this.selectHeadCellToDisplayCheckbox()
        }),
        untilDestroyed(this)
      ).subscribe()
      this.rows.changes.pipe(
        startWith(this.rows),
        tap(() => {
          this.selectRowCellToDisplayCheckbox()
        }),
        untilDestroyed(this)
      ).subscribe()
    }

    this.trackHeadCellChanges();

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  selectCellToDisplayCheckbox(cells: QueryList<TableCellBaseComponent>) {
    let isCellSelected = false;

    for (let cell of cells) {
      if (isCellSelected) {
        cell.isCheckboxDisplayed = false;
      } else if (cell.isVisible) {
        cell.isCheckboxDisplayed = true;
        isCellSelected = true
      }
    }
  }

  selectColumnToDisplayCheckbox() {
    this.selectHeadCellToDisplayCheckbox()
    this.selectRowCellToDisplayCheckbox()
  }

  selectHeadCellToDisplayCheckbox() {
    this.selectCellToDisplayCheckbox(this.headCells)
  }

  selectRowCellToDisplayCheckbox() {
    for (let row of this.rows) {
      this.selectCellToDisplayCheckbox(row.cells)
    }
  }

  private trackHeadCellChanges(): void {
    this.headCells.changes.pipe(
      startWith(this.headCells),
      switchMap(() => this.getHeadCellValueChanges()),
      untilDestroyed(this)
    ).subscribe();
  }

  private getHeadCellValueChanges() {
    const observables = this.headCells.map((headCell, index) => {
      return headCell.control.valueChanges.pipe(
        startWith(headCell.control.value),
        filter(() => headCell.isCheckboxDisplayed),
        switchMap(value => this.trackRowChanges(value, index))
      )
    })
    return forkJoin(observables)
  }

  private trackRowChanges(value: any, index: number) {

    return this.rows.changes.pipe(
      startWith(this.rows),
      tap(() => this.updateRowCells(value, index))
    );
  }

  private updateRowCells(value: any, index: number): void {
    for (const row of this.rows) {
      const cell = row.cells.get(index);
      if (cell) {
        cell.control.setValue(value);
      }
    }

    this.emit();
  }

  getIndexById(rowId) {
    return this.rows.toArray().findIndex(row => row.rowId === rowId);
  }

  onCheckboxClick(rowId, value: boolean, rowStatus: string) {
    const index = this.getIndexById(rowId);
    if (this.shiftKeyHeldDown && this.lastCheckedIndex !== null) {
      const start = Math.min(this.lastCheckedIndex, index);
      const end = Math.max(this.lastCheckedIndex, index);
      for (let i = start; i <= end; i++) {
        // Здесь должен быть код для выделения строки, например:
        this.rows.get(i)?.cell?.control?.setValue?.(value);
        // this.rows.get(i)?.cell?.control?.setValue?.(rowStatus);
      }
    }
    if (!this.shiftKeyHeldDown) this.lastCheckedIndex = index;
    this.emit();
  }

  emit() {
    const selectedRows = this.rows.toArray().filter(row => row.state);
    this.selectionChange.emit({
      selectedCount: selectedRows.length,
      selectedIds: selectedRows.map(row => row.rowId)
    });
  }

  deselect() {
    this.selectionChange.emit({
      selectedCount: 0,
      selectedIds: []
    });
  }
}
