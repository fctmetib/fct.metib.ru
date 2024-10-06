import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'mib-demand-signature-second-step',
  templateUrl: './demand-signature-second-step.component.html',
  styleUrls: ['./demand-signature-second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemandSignatureSecondStepComponent {
  @Input() orgDataForm: FormGroup;
}
