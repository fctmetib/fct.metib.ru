import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {TableCellSize} from './components/table-cell/interfaces/table-cell.interface';
import {TableRowComponent} from './components/table-row/table-row.component';
import {TableHeadCellComponent} from './components/table-head-cell/table-head-cell.component';
import {tap} from 'rxjs';

@Component({
  selector: 'mib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterContentInit {

  @ContentChildren(TableRowComponent) rows: QueryList<TableRowComponent>
  @ContentChildren(TableHeadCellComponent, {descendants: true}) headCells: QueryList<TableHeadCellComponent>

  @Input() set size(value: TableCellSize) {
    this._size = value;
  }

  public _size: TableCellSize = 'm'

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
}
