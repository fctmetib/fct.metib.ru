import {Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TableCellSize, TableCellType} from './interfaces/table-cell.interface';
import {FormControl} from '@angular/forms';
import {tap} from 'rxjs';

@Component({
  host: {
    'class': 'table-cell flex flex_align-center gap-8'
  },
  selector: 'mib-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit, OnChanges {
  @Input() type: TableCellType = 'text';
  @Input() set size(value: TableCellSize) {this._size = value;}
  @HostBinding('title') @Input() title: string = ''
  @Input() checked: boolean;
  @Input() showCheckbox: boolean = true;
  @Input() contracted: boolean = false;
  @Output() onCheck = new EventEmitter<boolean>();

  public _size: TableCellSize = 'm'
  public checkboxId: string;

  control: FormControl = new FormControl<boolean>(false)

  @HostBinding('class')
  get classes() {
    return {
      [`table-cell_type-${this.type}`]: true,
      [`table-cell_${this._size}`]: true,
    }
  }

  ngOnInit() {
    this.checkboxId = 'checkbox-' + Math.random().toString(36).substr(2, 9);

    this.control.valueChanges.pipe(
      tap((value) => {
        this.onCheck.emit(value)
      })
    ).subscribe()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.checked) {
      this.control.setValue(this.checked, { emitEvent: false });
    }
  }
}
