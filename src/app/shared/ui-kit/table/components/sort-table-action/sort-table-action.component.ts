import { Component, ElementRef, HostBinding, inject, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../../ref-icon/icon.module';
import { TableComponent } from '../../table.component';
import { HEAD_CELL_IS_HOVER, TableHeadCellComponent } from '../table-head-cell/table-head-cell.component';
import { getNestedValue } from '../../../../functions/utils';
import { tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  host: {
    'title': 'Сортировка'
  },
  selector: 'mib-sort-table-action',
  standalone: true,
  imports: [CommonModule, IconModule],
  templateUrl: './sort-table-action.component.html',
  styleUrls: ['./sort-table-action.component.scss']
})
export class SortTableActionComponent implements OnInit {
  private table = inject(TableComponent);
  private tableHeadCell = inject(TableHeadCellComponent);
  isCellHover$ = inject(HEAD_CELL_IS_HOVER)
  r2 = inject(Renderer2)
  elRef = inject(ElementRef)

  sortType: 'up' | 'down' = 'down';
  @HostBinding('class.selected')
  isSelected: boolean = false;

  get iconName() {
    return 'fi_chevrons-' + this.sortType;
  }

  ngOnInit() {
    this.isCellHover$.pipe(
      tap(state => {
        if (state) {
          this.r2.addClass(this.elRef.nativeElement, 'is-hover')
        } else {
          this.r2.removeClass(this.elRef.nativeElement, 'is-hover')
        }
      }),
      untilDestroyed(this)
    ).subscribe()
  }

  private _toggleSortDirection() {
    this.sortType = this.sortType === 'up' ? 'down' : 'up';
  }

  private _sortAlphabetical(a: any, b: any): number {
    const aValue = getNestedValue(a, this.tableHeadCell.field);
    const bValue = getNestedValue(b, this.tableHeadCell.field);
    return this.sortType === 'up'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }

  private _sortDate(a: any, b: any): number {
    const aValue = new Date(getNestedValue(a, this.tableHeadCell.field)).getTime();
    const bValue = new Date(getNestedValue(b, this.tableHeadCell.field)).getTime();
    return this.sortType === 'up' ? aValue - bValue : bValue - aValue;
  }

  private _sortNumerical(a: any, b: any): number {
    const aValue = Number(getNestedValue(a, this.tableHeadCell.field));
    const bValue = Number(getNestedValue(b, this.tableHeadCell.field));
    return this.sortType === 'up' ? aValue - bValue : bValue - aValue;
  }

  private _sortBoolean(a: any, b: any): number {
    const aValue = Boolean(getNestedValue(a, this.tableHeadCell.field));
    const bValue = Boolean(getNestedValue(b, this.tableHeadCell.field));
    if (aValue === bValue) return 0;
    return this.sortType === 'up'
      ? aValue ? 1 : -1
      : aValue ? -1 : 1;
  }

  sort() {
    switch (this.tableHeadCell.sortType) {
      case 'alphabetical':
        this.table.data = this.table.data.sort((a, b) => this._sortAlphabetical(a, b));
        break;
      case 'date':
        this.table.data = this.table.data.sort((a, b) => this._sortDate(a, b));
        break;
      case 'numerical':
        this.table.data = this.table.data.sort((a, b) => this._sortNumerical(a, b));
        break;
      case 'boolean':
        this.table.data = this.table.data.sort((a, b) => this._sortBoolean(a, b));
        break;
      default:
        break;
    }
  }

  resetSortActions() {
    for (let headCell of this.table.headCells) {
      if (headCell.sortActionComponent) {
        headCell.sortActionComponent.isSelected = false;
      }
    }
  }

  onClick() {
    if (this.isSelected) {
      this._toggleSortDirection();
    }
    this.sort();
    this.resetSortActions()
    this.isSelected = true
  }
}
