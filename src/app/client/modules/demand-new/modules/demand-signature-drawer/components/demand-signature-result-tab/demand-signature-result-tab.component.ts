import { Component, Input } from '@angular/core';
import { DemandInterface } from '../../../../types/demand.interface';

@Component({
  selector: 'mib-demand-signature-result-tab',
  templateUrl: './demand-signature-result-tab.component.html',
  styleUrls: ['./demand-signature-result-tab.component.scss']
})
export class DemandSignatureResultTabComponent {
  @Input() viewingData: DemandInterface<any>
}
