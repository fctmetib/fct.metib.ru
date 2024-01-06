import {Component, ContentChildren, Input, QueryList} from '@angular/core';
import {DeviceType} from '../../../../interfaces/shared.interface';
import {TableCellComponent} from '../table-cell/table-cell.component';
import {TableRowAnimationService} from '../../services/table-row-animation.service';
import {TableComponent} from '../../table.component';
import {AnimationService} from '../../../../animations/animations.service';

export const TABLE_ROW_ANIMATION_CONFIG = {
  translateDistance: '-3%',
  endOpacity: 0,
  startOpacity: 1,
  duration: 300
}

@Component({
  selector: 'mib-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  animations: [new AnimationService().generateAnimation(TABLE_ROW_ANIMATION_CONFIG)],

})
export class TableRowComponent {
  @ContentChildren(TableCellComponent) cells: QueryList<TableCellComponent>
  @Input() rowId: number; // Уникальный идентификатор для строки
  @Input() device: DeviceType = 'desktop';
  @Input() underlined: boolean = false;

  constructor(
    private tableComponent: TableComponent,
    private tableRowAnimationService: TableRowAnimationService
  ) {
  }

  get animationState() {
    return this.tableRowAnimationService.getAnimationState(this.rowId);
  }

  get cell(): TableCellComponent | undefined {
    return this.cells.find(cell => cell.showCheckbox);
  }

  selectRow() {
    this.cell?.toggle()
  }

  get state() {
    return Boolean(this.cell?.state)
  }

}
