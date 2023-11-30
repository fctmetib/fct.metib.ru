import {Component, Input, OnInit} from '@angular/core';
import {TableCellSize, TableCellType} from './interfaces/table-cell.interface';

@Component({
  selector: 'mib-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {
  checkboxId: string;
  @Input() type: TableCellType = 'text';
  @Input() set size(value: TableCellSize) {
    this._size = value;
  }
  @Input() title: string = ''

  public _size: TableCellSize = 'm'

  get classes() {
    return {
      [`table-cell_type-${this.type}`]: true,
      [`table-cell_${this._size}`]: true,
    }
  }

  ngOnInit() {
    this.checkboxId = 'checkbox-' + Math.random().toString(36).substr(2, 9);
  }
}
