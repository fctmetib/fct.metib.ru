import {Component, Input} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'mib-demand-surety-drawer-fourth-step',
  templateUrl: './demand-surety-drawer-fourth-step.component.html',
  styleUrls: ['./demand-surety-drawer-fourth-step.component.scss']
})
export class DemandSuretyDrawerFourthStepComponent {
  @Input() mainDataForm: FormGroup;
}
