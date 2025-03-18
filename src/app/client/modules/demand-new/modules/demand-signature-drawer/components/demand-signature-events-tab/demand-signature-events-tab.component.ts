import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Properties } from 'csstype';
import { DemandMessageInterface } from '../../../../types/demand-new-message.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'mib-demand-signature-events-tab',
  templateUrl: './demand-signature-events-tab.component.html',
  styleUrls: ['./demand-signature-events-tab.component.scss']
})
export class DemandSignatureEventsTabComponent implements OnInit {
  @ViewChildren('messagesContent') messagesContent: QueryList<ElementRef>

  @Input() messages!: DemandMessageInterface[]
  @Input() loading$!: Observable<boolean>

  public loading = false

  ngOnInit() {
    this.loading$.subscribe(value => {
      this.loading = value
      if (!value) {
        setTimeout(() => {
          this.messagesContent.forEach(message => {
            if ((+message.nativeElement.id) + 1 === this.messages?.length) {
              message.nativeElement.scrollIntoView({block: 'center', behavior: 'auto'})
            }
          })
        },0)
      }
    })

  }

  public skeleton: Properties = {
    borderRadius: '8px',
    height: '95px',
    width: '100%'
  }

  get height() {
    return `55vh`
  }

  identify(index, item) {
    return item.DemandMessageID
  }
}
