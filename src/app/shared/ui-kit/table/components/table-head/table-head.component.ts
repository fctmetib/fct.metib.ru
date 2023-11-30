import {Component, Input} from '@angular/core';
import {TableCellSize} from '../table-cell/interfaces/table-cell.interface';

@Component({
  selector: 'mib-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.scss']
})
export class TableHeadComponent {
  @Input() set size(value: TableCellSize) {
    this._size = value;
  }

  public _size: TableCellSize = 'm'
}
