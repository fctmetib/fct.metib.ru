import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'mib-demand-signature-second-step',
  templateUrl: './demand-signature-second-step.component.html',
  styleUrls: ['./demand-signature-second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemandSignatureSecondStepComponent {
  @Input() orgDataForm: FormGroup;
  @Input() options: [] = [];
  @Output() apply = new EventEmitter<void>()

  public confirmIds() {
    this.apply.emit();
  }
}
