import { Component, ElementRef, HostBinding, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../../ref-icon/icon.module';
import { BadgeModule } from '../../../badge/badge.module';
import { FilterDropdownComponent } from '../../../dropdown/components/filter-dropdown/filter-dropdown.component';
import { DropdownModule } from '../../../dropdown/dropdown.module';
import { HEAD_CELL_IS_HOVER, TableHeadCellComponent } from '../table-head-cell/table-head-cell.component';
import { DropdownService } from '../../../dropdown/services/dropdown.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TableComponent } from '../../table.component';

@UntilDestroy()
@Component({
  host: {
    'title': 'Фильтрация'
  },
  selector: 'mib-filter-table-action',
  standalone: true,
  imports: [CommonModule, IconModule, BadgeModule, FilterDropdownComponent, DropdownModule],
  templateUrl: './filter-table-action.component.html',
  styleUrls: ['./filter-table-action.component.scss']
})
export class FilterTableActionComponent implements OnInit {
  private table = inject(TableComponent);
  private tableHeadCell = inject(TableHeadCellComponent);

  @ViewChild(FilterDropdownComponent, {static: true}) filterDropdown: FilterDropdownComponent

  @HostBinding('class.selected')
  isApplied = false;

  isCellHover$ = inject(HEAD_CELL_IS_HOVER)
  dropdownService = inject(DropdownService)
  r2 = inject(Renderer2)
  elRef = inject(ElementRef)

  filterCallback = () => {
    this.table.rendererData = this.table.data
  }

  ngOnInit() {
    this.isCellHover$.pipe(
      tap(state => {
        if (state) {
          this.r2.addClass(this.elRef.nativeElement, 'is-hover')
        } else {
          this.dropdownService.closeMenu()
          this.r2.removeClass(this.elRef.nativeElement, 'is-hover')
        }
      }),
      untilDestroyed(this)
    ).subscribe()

    this.table.data$.pipe(
      filter(() => this.isApplied),
      tap(() => this.filterCallback()),
      untilDestroyed(this)
    ).subscribe()
  }

  filterData(values: string[]) {
    (this.filterCallback = () => {
      this.table.rendererData = this.table.data.filter(el => values.includes(el[this.tableHeadCell.field]))
      console.log('pizdec?', this.isApplied, this.table.rendererData);
    })()
  }

  resetData() {
    this.table.rendererData = [...this.table.data]
  }

  onApply($event: string[]) {
    this.resetFilterActions()
    this.filterData($event);
    this.isApplied = true;
  }

  onCancel() {
    this.isApplied = false;
    this.resetData()
  }

  resetFilterActions() {
    for (let headCell of this.table.headCells) {
      if (headCell.filterActionComponent && headCell !== this.tableHeadCell) {
        headCell.filterActionComponent.isApplied = false;
        headCell.filterActionComponent.filterDropdown.resetValue()
      }
    }
  }
}
