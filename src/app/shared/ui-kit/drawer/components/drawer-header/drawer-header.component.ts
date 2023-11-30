import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DrawerHeaderType} from './interfaces/drawer-header.inteface';

@Component({
  selector: 'mib-drawer-header',
  templateUrl: './drawer-header.component.html',
  styleUrls: ['./drawer-header.component.scss']
})
export class DrawerHeaderComponent {
  @Input() type: DrawerHeaderType = 'view'
  @Input() showEdits: boolean = false;
  @Input() showMaximize: boolean = false;
  @Input() showProgressBar: boolean = false;
  @Output() onClose = new EventEmitter()

  get classes() {
    return {
      [`drawer-header_type-${this.type}`]: true
    }
  }
}
