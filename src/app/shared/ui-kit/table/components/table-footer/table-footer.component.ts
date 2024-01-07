import {Component, Input} from '@angular/core';
import {TableComponent} from '../../table.component';

@Component({
  host: {
    '[class.table-footer_underlined]': 'lined'
  },
  selector: 'mib-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent {
  @Input() lined: boolean = true;

  constructor(
    public table: TableComponent
  ) {
  }
}
