import {
  Component,
  EventEmitter,
  HostBinding, inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { TableCellSize, TableCellType } from './interfaces/table-cell.interface';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { TableCellBaseComponent } from '../table-cell-base/table-cell-base.component';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
  selector: 'mib-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
})
export class TableCellComponent extends TableCellBaseComponent implements OnInit {
  @Input() set size(value: TableCellSize) {
    this._size = value;
  }

  @Input() type: TableCellType = 'text';
  @Input() contracted: boolean = false;
  @Input() special: boolean = false;
  @Output() onCheck = new EventEmitter<boolean>();
  @Output() press = new EventEmitter<any>();
  @HostBinding('title') @Input() title: string = '';

  private row = inject(TableRowComponent)

  _size: TableCellSize = 's';
  checkboxId: string;
  control = new FormControl<boolean>(false);

  get state() {
    return Boolean(this.control?.value);
  }

  // override не получилось сделать :9
  get checkboxVisible() {
    return this.isCheckboxDisplayed && this.row.showCheckbox
  }

  @HostBinding('class')
  get classes() {
    return {
      [`table-cell_type-${this.type}`]: true,
      [`table-cell_size-${this._size}`]: true,
      [`special`]: this.special
    };
  }

  ngOnInit() {
    this.checkboxId = 'checkbox-' + Math.random().toString(36).substr(2, 9);

    this.control.valueChanges.pipe(
      distinctUntilChanged(),
      tap(value => {
        this.onCheck.emit(value);
      })
    ).subscribe();
  }

  toggleCheckbox() {
    this.control.setValue(!this.control.value);
  }
}
