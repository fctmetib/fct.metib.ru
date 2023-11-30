import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {TableCellSize, TableCellType} from './interfaces/table-cell.interface';

@Component({
  host: {
    'class': 'table-cell flex flex_align-center gap-8'
  },
  selector: 'mib-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {
  @Input() type: TableCellType = 'text';
  @Input() set size(value: TableCellSize) {this._size = value;}
  @HostBinding('title') @Input() title: string = ''
  @Input() showCheckbox: boolean = true;
  @Input() contracted: boolean = false;

  public _size: TableCellSize = 'm'
  public checkboxId: string;

  @HostBinding('class')
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
