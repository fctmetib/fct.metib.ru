import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableComponent} from '../../table.component';

@Component({
  host: {
    '[class.table-footer_lined]': 'lined'
  },
  selector: 'mib-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent {
  @Input() lined: boolean = true;
  @Input() actionLoading: boolean = false;

  @Output() onAction = new EventEmitter<void>()
  @Output() onDelete = new EventEmitter<any[]>()

  constructor(
    public table: TableComponent
  ) {
  }

  onDeleteHandler() {
    this.onDelete.emit(this.table.selectedRows.map(row => row.rowId))
  }
}
