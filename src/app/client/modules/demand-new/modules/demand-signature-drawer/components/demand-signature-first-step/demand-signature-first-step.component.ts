import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'mib-demand-signature-first-step',
  templateUrl: './demand-signature-first-step.component.html',
  styleUrls: ['./demand-signature-first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemandSignatureFirstStepComponent {

  @Input() orgDataForm: FormGroup;
  @Input() options: [] = [];

  constructor() {}

  public confirmIds() {
/*    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )*/
  }
}
