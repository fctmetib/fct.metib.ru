import {Component, EventEmitter, Output} from '@angular/core';
import {TableFooterComponent} from '../table-footer/table-footer.component';

@Component({
  selector: 'mib-table-quick-action-island',
  templateUrl: './table-quick-action-island.component.html',
  styleUrls: ['./table-quick-action-island.component.scss']
})
export class TableQuickActionIslandComponent {
  @Output() onAction = new EventEmitter<void>()
  @Output() onDelete = new EventEmitter<void>()

  constructor(
    private footer: TableFooterComponent
  ) {
  }

  get table() {
    return this.footer.table
  }
}
