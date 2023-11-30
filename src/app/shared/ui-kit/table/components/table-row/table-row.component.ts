import {Component, Input} from '@angular/core';
import {DeviceType} from '../../../../interfaces/shared.interface';

@Component({
  selector: 'mib-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {
  @Input() device: DeviceType = 'desktop';
  @Input() underlined: boolean = false;
}
