import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {DeviceType} from '../../interfaces/shared.interface';
import {OpacityViewAnimation} from '../../animations/animations';

@Component({
  selector: 'mib-cash-panel',
  templateUrl: './cash-panel.component.html',
  styleUrls: ['./cash-panel.component.scss'],
  animations: [
    OpacityViewAnimation
  ]
})
export class CashPanelComponent {

  @Input() device: DeviceType = 'desktop'

  public isHover: boolean = false;

  get classes() {
    return {
      [`cash-panel_${this.device}`]: true
    }
  }
}
