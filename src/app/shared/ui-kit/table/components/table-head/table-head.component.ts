import { AfterViewInit, Component, ContentChildren, forwardRef, inject, Input, QueryList } from '@angular/core';
import {TableCellSize} from '../table-cell/interfaces/table-cell.interface'
import { TableHeadCellComponent } from '../table-head-cell/table-head-cell.component';
import { startWith } from 'rxjs/operators';
import { tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TableComponent } from '../../table.component';

@UntilDestroy()
@Component({
	selector: 'mib-table-head',
	templateUrl: './table-head.component.html',
	styleUrls: ['./table-head.component.scss']
})
export class TableHeadComponent {
	@Input()
  set size(value: TableCellSize) {
		this._size = value
	}

  get size() {
    return this._size
  }

  private _size: TableCellSize = 'm'

}
