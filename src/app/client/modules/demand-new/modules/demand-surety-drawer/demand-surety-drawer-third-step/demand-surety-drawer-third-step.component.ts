import {Component, Input} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'mib-demand-surety-drawer-third-step',
  templateUrl: './demand-surety-drawer-third-step.component.html',
  styleUrls: ['./demand-surety-drawer-third-step.component.scss']
})
export class DemandSuretyDrawerThirdStepComponent {
  @Input() bankForm: FormGroup;
  @Input() options: [] = [];
}
