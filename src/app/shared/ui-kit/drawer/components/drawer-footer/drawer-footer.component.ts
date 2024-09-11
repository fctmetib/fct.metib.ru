import {Component, Input} from '@angular/core';
import {DrawerHeaderType} from '../drawer-header/interfaces/drawer-header.inteface';

@Component({
  selector: 'mib-drawer-footer',
  templateUrl: './drawer-footer.component.html',
  styleUrls: ['./drawer-footer.component.scss']
})
export class DrawerFooterComponent {
  @Input() type: DrawerHeaderType = 'view'
  @Input() showProgressBar: boolean = false;

  get classes() {
    return {
      [`drawer-footer_type-${this.type}`]: true
    }
  }
}
