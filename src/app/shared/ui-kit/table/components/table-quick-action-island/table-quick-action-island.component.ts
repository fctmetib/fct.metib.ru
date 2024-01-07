import {Component, Input} from '@angular/core';
import {TableFooterComponent} from '../table-footer/table-footer.component';

@Component({
  selector: 'mib-table-quick-action-island',
  templateUrl: './table-quick-action-island.component.html',
  styleUrls: ['./table-quick-action-island.component.scss']
})
export class TableQuickActionIslandComponent {

  constructor(
    public footer: TableFooterComponent
  ) {
  }

  get table() {
    return this.footer.table
  }
}
