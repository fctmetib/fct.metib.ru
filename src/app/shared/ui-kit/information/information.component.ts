import {Component, Input} from '@angular/core';
import {InformationType} from './interfaces/information.interface';

@Component({
  selector: 'mib-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  @Input() type: InformationType = 'information'
  @Input() showIcon: boolean = true;
  @Input() showHeader: boolean = false;

  get classes() {
    return {
      [`information_type-${this.type}`]: true
    }
  }
}
