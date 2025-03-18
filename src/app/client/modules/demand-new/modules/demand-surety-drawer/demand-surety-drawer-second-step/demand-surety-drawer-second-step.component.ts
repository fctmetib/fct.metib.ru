import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'mib-demand-surety-drawer-second-step',
  templateUrl: './demand-surety-drawer-second-step.component.html',
  styleUrls: ['./demand-surety-drawer-second-step.component.scss']
})
export class DemandSuretyDrawerSecondStepComponent {
  @Input() orgDataForm: FormGroup;
  @Input() options: [] = [];
  @Output() apply = new EventEmitter<void>()

  public confirmIds() {
    this.apply.emit();
  }
}
