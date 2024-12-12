import { Component, Input } from '@angular/core';
import { DemandMessageInterface } from '../../../client/modules/demand-new/types/demand-new-message.interface';

@Component({
  selector: 'mib-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent {
  @Input() message: DemandMessageInterface
  @Input() hasDocument = false;
}
