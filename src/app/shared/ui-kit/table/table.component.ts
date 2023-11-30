import {Component, Input} from '@angular/core';
import {TableCellSize} from './components/table-cell/interfaces/table-cell.interface';

@Component({
  selector: 'mib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() set size(value: TableCellSize) {
    this._size = value;
  }

  public _size: TableCellSize = 'm'
}
