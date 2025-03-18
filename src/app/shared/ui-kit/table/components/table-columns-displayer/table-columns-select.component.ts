import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from '../../../select/select.module';
import { DropdownPointModule } from '../../../dropdown-point/dropdown-point.module';
import { TableComponent } from '../../table.component';
import { TableHeadCellComponent } from '../table-head-cell/table-head-cell.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToolsService } from '../../../../services/tools.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TableCellBaseComponent } from '../table-cell-base/table-cell-base.component';

@UntilDestroy()
@Component({
  selector: 'mib-table-columns-select',
  standalone: true,
  imports: [CommonModule, SelectModule, DropdownPointModule, ReactiveFormsModule],
  templateUrl: './table-columns-select.component.html',
  styleUrls: ['./table-columns-select.component.scss']
})
export class TableColumnsSelectComponent implements OnInit, AfterViewInit {
  @Input() tableRef?: TableComponent;

  columns: TableHeadCellComponent[] = [];
  control = new FormControl<string[]>([]);

  private toolsService = inject(ToolsService);

  get placeholder() {
    return `${this.control.value.length} из ${this.columns.length} ${this.toolsService.declineWord(this.columns.length, ['колонка', 'колонки', 'колонок'])} в таблице`;
  }

  hideCell(cellVisibility: TableCellBaseComponent) {
    cellVisibility.isVisible = false;
  }

  showCell(cellVisibility: TableCellBaseComponent) {
    cellVisibility.isVisible = true;
  }

  ngOnInit() {
    if (!this.tableRef) throw new Error('TableColumnsSelectComponent не может использоваться без tableRef');
  }

  ngAfterViewInit() {
    this.columns = this.tableRef.headCells.toArray();
    this.control.setValue(this.columns.map(x => x.id));
  }

  findInstanceAndIndexOfHeadCell(selectedCellId: string) {
    const headCellIndex = this.tableRef.headCells.toArray().findIndex(cell => cell.id === selectedCellId);
    return {
      headCell: this.tableRef.headCells.get(headCellIndex),
      headCellIndex
    };
  }

  showColumn(selectedCellId: string) {

    const { headCell, headCellIndex } = this.findInstanceAndIndexOfHeadCell(selectedCellId);

    this.showCell(headCell);
    for (let row of this.tableRef.rows) {
      this.showCell(row.cells.get(headCellIndex));
    }
  }

  hideColumn(selectedCellId: string) {

    const { headCell, headCellIndex } = this.findInstanceAndIndexOfHeadCell(selectedCellId);

    this.hideCell(headCell);
    for (let row of this.tableRef.rows) {
      this.hideCell(row.cells.get(headCellIndex));
    }
  }

  onSelect(selectedCellId: string) {
    if (this.control.value.includes(selectedCellId)) {
      this.showColumn(selectedCellId);
    } else {
      this.hideColumn(selectedCellId);
    }
    this.tableRef.selectColumnToDisplayCheckbox()
  }
}
