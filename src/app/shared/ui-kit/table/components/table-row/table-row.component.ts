import {Component, ContentChildren, Input, QueryList} from '@angular/core';
import {DeviceType} from '../../../../interfaces/shared.interface';
import {TableCellComponent} from '../table-cell/table-cell.component';

@Component({
  selector: 'mib-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {
  @ContentChildren(TableCellComponent) cells: QueryList<TableCellComponent>
  @Input() device: DeviceType = 'desktop';
  @Input() underlined: boolean = false;

  selectRow() {
    const cell = this.cells.find(cell => cell.showCheckbox);
    cell?.toggle()
  }
}
